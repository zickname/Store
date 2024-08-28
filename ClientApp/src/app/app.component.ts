import { Component } from '@angular/core';
import {HeaderComponent} from "./components/UI/header/header.component";
import {AlertComponent} from "./components/alert/alert.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ClientApp';
}
