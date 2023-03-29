import { Fields } from "./Fields";
import { Selections } from "./Selections";

export default interface TableRequest {
  fields: Fields;
  height: number;
  top: number;
  selections?: Selections;
  tableName?: string;
  debug?: boolean;
}
