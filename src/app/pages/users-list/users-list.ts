import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

@Component({
  selector: 'app-users-list',
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './users-list.html',
  styleUrl: './users-list.css',
})
export class UsersList implements OnInit {
  users$!: Observable<User[]>;
  filteredUsers$!: Observable<User[]>;
  search$!: Observable<string>;
  searchControl = new FormControl('');

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users$ = this.userService.getUser();

    this.filteredUsers$ = combineLatest([
      this.users$,
      this.searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged()
      ),
    ]).pipe(
      map(([users, search]) => {
        const term = search?.toLowerCase();
        if (!term) return users;
        return users.filter((user) => user.name.toLowerCase().includes(term));
      })
    );
  }

  onSearch(input: string) {
    const search = input.trim().toLowerCase();
    this.filteredUsers$ = this.users$.pipe(
      map((users) => {
        return users.filter((user) => user.name.toLowerCase().includes(search));
      })
    );
  }
}
