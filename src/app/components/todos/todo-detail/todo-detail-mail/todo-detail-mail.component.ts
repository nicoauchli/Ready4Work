import {Component, Input, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SafeHtmlPipe} from "../../../../pipes/safe-html.pipe";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-todo-detail-mail',
  imports: [
    MatButton,
    CdkTextareaAutosize,
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './todo-detail-mail.component.html',
  standalone: true,
  styleUrl: './todo-detail-mail.component.scss'
})
export class TodoDetailMailComponent implements OnInit {

  public sanitizedContent!: SafeHtml;

  @Input()
  emailContent!: string[];

  constructor(
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    console.log(this.emailContent[0])
      this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(this.emailContent[0]);
  }

  public copyContent(content: string): void {
    const textarea = document.createElement('textarea');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.value = content;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    this.snackBar.open('Inhalt in die Zwischenablage kopiert', 'Schließen', {
      duration: 3000,
    });
  }

}
