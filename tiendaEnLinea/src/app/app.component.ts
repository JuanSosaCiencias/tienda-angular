import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './modules/layout/component/navbar/navbar.component';
import { ThemeSelectorComponent } from './modules/layout/component/theme-selector/theme-selector.component';
import { Navbar2Component } from './modules/layout/component/navbar2/navbar2.component';
import { FooterComponent } from './modules/layout/component/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    NavbarComponent, 
    ThemeSelectorComponent,
    Navbar2Component,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tiendaEnLinea';
}
