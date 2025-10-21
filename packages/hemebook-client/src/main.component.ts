import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthClient } from './services/auth';

@Component({
  selector: 'pbk-root',
  imports: [RouterOutlet],
  template: `
    <router-outlet />
  `,
  styles: [],
})
export class MainComponent {
}
