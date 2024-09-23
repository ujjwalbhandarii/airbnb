import { Component } from '@angular/core';
import { ButtonComponent } from '../shared/components/button/button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './homepage.component.html',
  styles: ``,
})
export class HomeComponent {}
