/**
 * This is the mocked back end class.  It has two example datasets stored in a dictionary with their paths
 * as the key.  It has functions to simulate queries to the back end.
 */
let DataDict: Map<string, string[][]> = new Map();
const exampleCSV1 = [
  ["Header1", "Header2", "Header3", "Header4", "Header5"],
  ["1", "2", "3", "4", "5"],
  ["The", "song", "remains", "the", "same."],
];
const exampleCSV2 = [
  ["Header1", "Header2", "Header3", "Header4", "Header5"],
  ["Data1", "Data2", "Data3", "Data4", "Data5"],
  ["Data5", "Data4", "Data3", "Data2", "Data1"],
];
DataDict = DataDict.set("data/exampleCSV1", exampleCSV1);
DataDict = DataDict.set("data/exampleCSV2", exampleCSV2);
/**
 * This is the MockedView back end function.  It actuall does do the full functionality of view, returning
 * the full 2d array of the saved data set or a message if the path is illegitimate.
 * @param path The filepath saved in REPLInput
 * @returns the array at that filepath, if it exists
 */
export function MockedView(path: string): string | string[][] {
  let Data = DataDict.get(path);
  if (typeof Data !== "undefined") {
    return Data;
  } else {
    return "Path not accepted";
  }
}
/**
 * This is the mocked search function.  It doesn't actually search through the datasets, but based on the args it provides
 * some rows as if it had searched through, and if a query/column combination is used that was not anticipated it returns
 * a message saying the searched term was not found in the column.
 * @param path filepath saved in REPLInput
 * @param args search term and column
 * @returns the results of the search as a 2d array
 */
export function MockedSearch(
  path: string,
  args: string[]
): string | string[][] {
  let Data = DataDict.get(path);
  if (typeof Data === "undefined") {
    return "Path not accepted";
  }
  if (path == "data/exampleCSV1") {
    if (args[0] == "2" && args[1] == "song") {
      return [Data[2]];
    }
    if (args[0] == "Header2" && args[1] == "song") {
      return [Data[2]];
    }
    if (args[0] == "3" && args[1] == "3") {
      return [Data[1]];
    }
  }
  if (path == "data/exampleCSV2") {
    if (args[0] == "2" && args[1] == "Data2") {
      return [Data[1]];
    }
    if (args[0] == "Header2" && args[1] == "Data4") {
      return [Data[2]];
    }
    if (args[0] == "3" && args[1] == "Data3") {
      return [Data[1], Data[2]];
    }
  }
  return "Sorry, search term not found in input column";
}
