import {TYPE} from "../enums/Type";
import {STATE} from "../enums/State";

export interface ITodoDTO {
  title: string,
  description: string,
  type: TYPE,
  state: STATE,
  employee_id: number,
}
