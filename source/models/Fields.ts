export type FieldType = "dimension" | "measure";

export type Field = {
  fieldDef: string;
  fieldName?: string;
  fieldType?: FieldType;
  columnIndex?: number;
};
export type Fields = Array<Field>;
