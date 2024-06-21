import {IEmployeeTodoDTO} from "./IEmployeeTodoDTO";
import {ITodoDAO} from "./ITodoDAO";

export interface IEmployeeTodoDAO extends IEmployeeTodoDTO {
  id: number;
  todo: ITodoDAO;
}
