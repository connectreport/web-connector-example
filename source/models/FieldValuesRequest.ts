import { Field } from "./Fields";
import { FieldValues } from "./FieldValues";

export interface FieldValuesRequest {
  field: Field;
  height?: number;
  top?: number;
  search?: string;
}
