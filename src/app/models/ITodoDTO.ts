import {TYPE} from "../enums/Type";

export interface ITodoDTO {
  title: string,
  type: TYPE,
  isDefault: boolean,
  content: string[],
}
