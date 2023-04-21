import { User } from "../models/User";
import { inspect } from "util";
import { debug } from "../util";
import { MetaDataResponse } from "../models/MetaDataResponse";

/** Used to deliver metadata to the UI to support report authoring
 * All properties of the metadata response are optional 
 */
export const getMetadataHandler = (user: User): Promise<MetaDataResponse> => {
  debug("Received getMetadata request", inspect(user));
  const response: MetaDataResponse = {
    visualizations: [
      {
        name: "Sales by Year",
        thumbnail:
          "https://example.com/sales-by-year-thumbnail.png",
        id: "sales",
      },
      {
        name: "Revenue vs Profit",
        thumbnail:
          "https://example.com/revenue-vs-profit-thumbnail.png",
        id: "revenue",
      },
    ],
    dimensions: [
      {
        fieldName: "Year",
        fieldDef: "year",
      },
      {
        fieldName: "Quarter",
        fieldDef: "quarter",
      },
      {
        fieldName: "Month",
        fieldDef: "month",
      },
      {
        fieldName: "Customer",
        fieldDef: "customer",
      }
    ],
    measures: [
      {
        fieldName: "Sales",
        fieldDef: "sales",
      },
      {
        fieldName: "Profit",
        fieldDef: "profit",
      },
    ],
    tables: [
      {
        name: "Sales",
        fields: [
          {
            fieldName: "Year",
            fieldType: "dimension",
            fieldDef: "Year",
          },
          {
            fieldName: "Quarter",
            fieldType: "dimension",
            fieldDef: "Quarter",
          },
          {
            fieldName: "Month",
            fieldType: "dimension",
            fieldDef: "Month",
          },
          {
            fieldName: "Sales",
            fieldType: "measure",
            fieldDef: "Sales",
          },
          {
            fieldName: "Profit",
            fieldType: "measure",
            fieldDef: "Profit",
          },
        ],
      },
      {
        name: "Customers",
        fields: [
          {
            fieldName: "Customer",
            fieldType: "dimension",
            fieldDef: "Customer",
          },
          {
            fieldName: "State",
            fieldType: "dimension",
            fieldDef: "State",
          },
          {
            fieldName: "City",
            fieldType: "dimension",
            fieldDef: "City",
          },
          {
            fieldName: "Sales",
            fieldType: "measure",
            fieldDef: "Sales",
          },
        ],
      },
    ],
    filterFields: [
      {
        fieldName: "Year",
        fieldDef: "Year",
      },
    ],
  };
  return Promise.resolve(response);
};
