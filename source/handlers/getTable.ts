import TableRequest from "../models/TableRequest";
import { TableResponse, TableCell } from "../models/TableResponse";
import { User } from "../models/User";
import { inspect } from "util";
import { debug } from "../util";

/** Used to fulfill tabular data requests */
export const getTableHandler = async (
  options: TableRequest,
  user: User
): Promise<TableResponse> => {
  debug(
    "Received getTable request",
    inspect(options, { compact: false, depth: 5, breakLength: 80 }),
    inspect(user)
  );
  return {
    table: Array(10).fill(
      Array(options.fields.length).fill({ text: "Abc" } as TableCell)
    ),
    size: {
      height: 10,
      width: options.fields.length,
    },
  };
};
