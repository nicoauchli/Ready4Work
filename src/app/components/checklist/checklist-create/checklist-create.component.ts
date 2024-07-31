import {Component} from '@angular/core';
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {Router, RouterLink} from "@angular/router";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {ITodoDTO} from "../../../models/ITodoDTO";
import {TYPE} from "../../../enums/Type";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {TodoService} from "../../../services/todo.service";
import {ITodoDAO} from "../../../models/ITodoDAO";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-checklist-create',
  standalone: true,
  imports: [
    MatDivider,
    MatIcon,
    MatIconButton,
    MatTooltip,
    RouterLink,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatOption,
    MatSelect,
    NgForOf,
    CdkTextareaAutosize
  ],
  templateUrl: './checklist-create.component.html',
  styleUrl: './checklist-create.component.scss'
})
export class ChecklistCreateComponent {

  public createChecklistForm: FormGroup;
  public types = [TYPE.TEXT, TYPE.LINK, TYPE.MAIL];
  protected readonly TYPE = TYPE;
  public linkContentArr: string[] = [];

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.createChecklistForm = this.fb.group({
      title: new FormControl("", [Validators.required]),
      type: new FormControl("text", [Validators.required]),
      content: new FormControl("", [Validators.required])
    });
  }

  public submitChecklistTodo() {
    const newChecklistTodo: ITodoDTO = {
      title: this.createChecklistForm.controls['title'].value,
      type: this.createChecklistForm.controls['type'].value,
      isDefault: true,
      content: this.createChecklistForm.controls['type'].value === TYPE.LINK ? this.linkContentArr : this.createChecklistForm.controls['content'].value    }
    this.todoService.createTodo(newChecklistTodo).subscribe( (todo: ITodoDAO) => {
      this._snackBar.open("Todo erstellt", "", { duration: 2000 });
      this.router.navigateByUrl(`/checklist`);
    });
  }


  public addLinkToContent() {
    this.linkContentArr.push(this.createChecklistForm.controls['content'].value);
  }

  public clearContent() {
    this.createChecklistForm.controls['content'].reset();
  }
}
