import {IEmployeeDTO} from "./IEmployeeDTO";
import {IEmployeeTodoDAO} from "./IEmployeeTodoDAO";

export interface IEmployeeDAO extends IEmployeeDTO{
  id: number,
  todos?: IEmployeeTodoDAO[]
}
