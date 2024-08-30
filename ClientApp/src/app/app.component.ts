import { Component } from '@angular/core';
import { HeaderComponent } from './components/UI/header/header.component';
import { AlertComponent } from './components/alert/alert.component';
import { FooterComponent } from './components/UI/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [HeaderComponent, AlertComponent, RouterOutlet, FooterComponent],
})
export class AppComponent {
  title = 'ClientApp';
}
