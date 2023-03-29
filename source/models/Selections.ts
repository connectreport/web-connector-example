import { FieldValues } from "./FieldValues";

export type Selection = {
  fieldName: string;
  fieldDef: string;
  fieldId?: string;
  fieldValues: FieldValues;
  selectAll?: boolean;
};
export type Selections = Array<Selection>;
