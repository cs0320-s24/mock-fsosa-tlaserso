import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

test("on page load, i see a login button", async ({ page }) => {
  await expect(page.getByLabel("Login")).toBeVisible();
});

test("on page load, i dont see the input box until login", async ({ page }) => {
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();

  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
});

test("after I type into the input box, its text changes", async ({ page }) => {
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

test("on page load, i see a button", async ({ page }) => {
  await page.getByLabel("Login").click();
  await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
});

test("after I click the button, my command gets pushed in brief mode", async ({
  page,
}) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("Load_File data/exampleCSV1");
  await page.getByRole("button", { name: "Submit" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Path changed to data/exampleCSV1");
});

test("after I click the button, i can change the mode", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("Mode");
  await page.getByRole("button", { name: "Submit" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("input: Mode output: changed to verbose");
});

test("after I change the mode, the mode command and the load command get pushed in verbose mode", async ({
  page,
}) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("Mode");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByLabel("Command input").fill("Load_File data/exampleCSV1");
  await page.getByRole("button", { name: "Submit" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(
    "input: Mode output: changed to verboseinput: Load_File data/exampleCSV1 output: Path changed to data/exampleCSV1"
  );
});

test("after loading a csv, i can view it as an html table", async ({
  page,
}) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("Load_File data/exampleCSV1");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByLabel("Command input").fill("View");
  await page.getByRole("button", { name: "Submit" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(
    "Path changed to data/exampleCSV1Header1Header2Header3Header4Header512345Thesongremainsthesame."
  );
});

test("after loading a csv, i can search it by column index and it returns the row as a table", async ({
  page,
}) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("Load_File data/exampleCSV1");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByLabel("Command input").fill("Search 2 song");
  await page.getByRole("button", { name: "Submit" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(
    "Path changed to data/exampleCSV1Thesongremainsthesame."
  );
});

test("after loading a csv, i can search it by column name and it returns the row as a table", async ({
  page,
}) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("Load_File data/exampleCSV1");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByLabel("Command input").fill("Search Header2 song");
  await page.getByRole("button", { name: "Submit" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(
    "Path changed to data/exampleCSV1Thesongremainsthesame."
  );
});

test("loading a csv with the wrong number of args", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page
    .getByLabel("Command input")
    .fill("Load_File data/exampleCSV1 random strings here");
  await page.getByRole("button", { name: "Submit" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(
    "wrong number of args.  Load_File only takes the filepath"
  );
});

test("using mode with the wrong number of args", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("Mode random strings here");
  await page.getByRole("button", { name: "Submit" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("wrong number of args (mode takes no input)");
});

test("using view with the wrong number of args", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("Load_File data/exampleCSV1");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByLabel("Command input").fill("View random strings here");
  await page.getByRole("button", { name: "Submit" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(
    "Path changed to data/exampleCSV1Sorry, wrong number of args.  View takes no args."
  );
});

test("using view without having a file loaded", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("View");
  await page.getByRole("button", { name: "Submit" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Sorry, no file has been loaded");
});

test("using view with an invalid file", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("Load_File data/fakefile");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByLabel("Command input").fill("View");
  await page.getByRole("button", { name: "Submit" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Path changed to data/fakefilePath not accepted");
});

test("using search with the wrong number of args", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("Load_File data/exampleCSV1");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByLabel("Command input").fill("Search 2 song random strings");
  await page.getByRole("button", { name: "Submit" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(
    "Path changed to data/exampleCSV1Sorry, wrong number of args.  Search takes <column> <value> args."
  );
});

test("using search without having a file loaded", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("Search 2 song");
  await page.getByRole("button", { name: "Submit" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Sorry, no file has been loaded");
});

test("using search with an invalid file", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("Load_File data/fakefile");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByLabel("Command input").fill("Search 2 song");
  await page.getByRole("button", { name: "Submit" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Path changed to data/fakefilePath not accepted");
});

test("using search and target not found in column", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("Load_File data/exampleCSV1");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByLabel("Command input").fill("Search 2 faketarget");
  await page.getByRole("button", { name: "Submit" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(
    "Path changed to data/exampleCSV1Sorry, search term not found in input column"
  );
});

test("invalid command", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("fakecommand");
  await page.getByRole("button", { name: "Submit" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Sorry, command not recognized");
});
