import { User } from "../models/User";
import { inspect } from "util";
import { FieldValuesRequest } from "../models/FieldValuesRequest";
import { FieldValuesResponse } from "../models/FieldValuesResponse";
import { debug } from "../util";

/** Used to retrieve list of fields values to filter on in UI */
export const getFieldValuesHandler = (
  options: FieldValuesRequest,
  user: User
): FieldValuesResponse => {
  debug("Received getFieldValues request", inspect(options), inspect(user));
  return {
    fieldValues: [
      {
        text: "2021"
      },
      {
        text: "2022"
      },
      {
        text: "2023"
      },
    ],
    size: {
      height: 4,
      width: 1,
    },
  };
};
