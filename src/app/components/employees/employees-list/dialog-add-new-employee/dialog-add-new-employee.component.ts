import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialogActions, MatDialogContainer, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Form, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {EmployeeService} from "../../../../services/employee.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {IEmployeeDTO} from "../../../../models/IEmployeeDTO";
import {IEmployeeDAO} from "../../../../models/IEmployeeDAO";

@Component({
  selector: 'app-dialog-add-new-employee',
  standalone: true,
  imports: [
    MatDialogContainer,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatIcon,
    MatIconButton,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
  ],
  templateUrl: './dialog-add-new-employee.component.html',
  styleUrl: './dialog-add-new-employee.component.scss'
})
export class DialogAddNewEmployeeComponent {

  newEmployeeFormGroup: FormGroup;
  @Output() employeeAdded = new EventEmitter<IEmployeeDAO>();

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogAddNewEmployeeComponent>
  ) {
    this.newEmployeeFormGroup = this.fb.group({
      firstname: new FormControl("", [Validators.required]),
      lastname: new FormControl("", [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.newEmployeeFormGroup.valid) {
      const newEmployee: IEmployeeDTO = {
        firstname: this.newEmployeeFormGroup.controls['firstname'].value,
        lastname: this.newEmployeeFormGroup.controls['lastname'].value,
      };
      this.employeeService.addNewEmployee(newEmployee).subscribe((employee: IEmployeeDAO) => {
        this.employeeAdded.emit(employee);
        this.dialogRef.close();
      });
    }
  }
}
