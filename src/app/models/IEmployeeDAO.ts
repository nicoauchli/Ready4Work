import {IEmployeeDTO} from "./IEmployeeDTO";
import {ITodoDAO} from "./ITodoDAO";

export interface IEmployeeDAO extends IEmployeeDTO{
  id: number,
  todos: ITodoDAO[]
}
