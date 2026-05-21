import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbar} from "@angular/material/toolbar";
import {MatListItem} from "@angular/material/list";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {LoadingIndicatorComponent} from "./components/loading-indicator/loading-indicator.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbar, MatIcon, RouterLink, MatButton, LoadingIndicatorComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Ready4Work';
}
