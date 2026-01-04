import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { UsersList } from './app/pages/users-list/users-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UsersList],
  template: `
    <!-- <h1>Hello from {{ name }}!</h1>
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a> -->
    <app-users-list></app-users-list>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
