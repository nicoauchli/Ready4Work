import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IEmployeeDAO} from "../../../../models/IEmployeeDAO";
import {EmployeeService} from "../../../../services/employee.service";
import {IEmployeeDTO} from "../../../../models/IEmployeeDTO";
import {useParallelTs} from "@angular-devkit/build-angular/src/utils/environment-options";

@Component({
  selector: 'app-dialog-edit-employee',
  standalone: true,
    imports: [
        MatDialogActions,
        MatDialogContent,
        MatFormField,
        MatIcon,
        MatIconButton,
        MatInput,
        MatLabel,
        ReactiveFormsModule
    ],
  templateUrl: './dialog-edit-employee.component.html',
  styleUrl: './dialog-edit-employee.component.scss'
})
export class DialogEditEmployeeComponent {
  editEmployeeFormGroup: FormGroup;
  public employee: IEmployeeDAO;
  @Output() employeeEdited = new EventEmitter<IEmployeeDAO>();

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogEditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {employee: IEmployeeDAO }
  ) {
    this.employee = data.employee
      this.editEmployeeFormGroup = this.fb.group({
      firstname: new FormControl(this.employee.firstname, [Validators.required]),
      lastname: new FormControl(this.employee.lastname, [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.editEmployeeFormGroup.valid) {
      const updatedEmployee: IEmployeeDAO = {
        id: this.employee.id,
        firstname: this.editEmployeeFormGroup.controls['firstname'].value,
        lastname: this.editEmployeeFormGroup.controls['lastname'].value,
      };
      this.employeeService.updateEmployee(updatedEmployee).subscribe((employee: IEmployeeDAO) => {
        updatedEmployee.todos = this.employee.todos;
      this.employeeEdited.emit(updatedEmployee);
      this.dialogRef.close();
      });
    }
  }
}
