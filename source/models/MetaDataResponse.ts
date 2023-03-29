import { Field } from "./Fields";

export type MetaDataResponse = {
  /** List of fields available to filter on */
  filterFields: Field[];
}