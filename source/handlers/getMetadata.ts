import { User } from "../models/User";
import { inspect } from "util";
import { debug } from "../util";
import { MetaDataResponse } from "../models/MetaDataResponse";

/** Used to deliver metadata to the UI to support report authoring
 */
export const getMetadataHandler = (
  user: User
): Promise<MetaDataResponse> => {
  debug("Received getMetadata request", inspect(user));
  return Promise.resolve({
    filterFields: [
      {
        fieldName: "Year",
        fieldDef: "Year",
      },
    ],
  });
};
