let DataDict: Map<string, string[][]> = new Map();
const exampleCSV1 = [
  ["1", "2", "3", "4", "5"],
  ["The", "song", "remains", "the", "same."],
];
const exampleCSV2 = [
  ["Data1", "Data2", "Data3", "Data4", "Data5"],
  ["Data5", "Data4", "Data3", "Data2", "Data1"],
];
DataDict = DataDict.set("data/exampleCSV1", exampleCSV1);
DataDict = DataDict.set("data/exampleCSV2", exampleCSV2);
export function MockedView(path: string): string | string[][] {
  let Data = DataDict.get(path);
  if (typeof Data !== "undefined") {
    return Data;
  } else {
    return "Path not accepted";
  }
}
export function MockedSearch(
  path: string,
  args: string[]
): string | string[][] {
  let Data = DataDict.get(path);
  if (typeof Data === "undefined") {
    return "Path not accepted";
  }
  if (path == "data/exampleCSV1") {
    if (args[1] == "2" && args[2] == "song") {
      return [Data[1]];
    }
    if (args[1] == "second" && args[2] == "song") {
      return [Data[1]];
    }
    if (args[1] == "3" && args[2] == "3") {
      return [Data[0]];
    }
  }
  if (path == "data/exampleCSV2") {
    if (args[1] == "2" && args[2] == "Data2") {
      return [Data[0]];
    }
    if (args[1] == "second" && args[2] == "Data4") {
      return [Data[1]];
    }
    if (args[1] == "3" && args[2] == "Data3") {
      return [Data[0], Data[1]];
    }
  }
  return [["Sorry, search not found"]];
}
