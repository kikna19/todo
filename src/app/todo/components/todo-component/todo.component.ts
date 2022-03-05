import {Component, OnInit} from "@angular/core";
import {Store} from "../../../../store";
import {AuthService} from "../../../auth/shared/service/auth.service";
import {Router} from "@angular/router";
import {faPowerOff} from "@fortawesome/free-solid-svg-icons/faPowerOff";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {TodoService} from "../../service/todo-service/todo.service";
import {map, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {faListSquares} from "@fortawesome/free-solid-svg-icons/faListSquares";


@Component({
  selector: 'todo',
  styleUrls: ['todo.component.scss'],
  template: `
    <mat-toolbar-row>
      <nav>
        <div class="main-header">
          <h1>what's up!</h1>
          <fa-icon
            routerLink="new"
            [icon]="todoIcon"></fa-icon>
        </div>
        <div class="main-text">
          <div>
            <h5>email:</h5>
            <p>{{user.email}}</p>
          </div>
          <div>
            <h5>authenticated:</h5>
            <p>{{ user.authenticated}}</p>
          </div>
          <button mat-mini-fab (click)="logOut()">
            <fa-icon [icon]="signOut"></fa-icon>
          </button>
        </div>
      </nav>
      <ng-template #loading>
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
      </ng-template>
      <router-outlet></router-outlet>
      <div *ngIf="todos$ | async as todos; else loading">
        <div *ngIf="!todos.length; " class="add-items">
          <div>
            <p>no items</p>
            <button
              routerLink="new"
              mat-mini-fab>
              <fa-icon [icon]="plus"></fa-icon>
            </button>
          </div>
        </div>
        <item
          *ngFor="let todo of todos"
          [element]="todo"
          [uid]="uid"
          (remove)="removeMeal($event)">
        </item>
      </div>
    </mat-toolbar-row>
  `
})

export class TodoComponent implements OnInit {

  user: any;
  signOut = faPowerOff;
  plus = faPlus;
  todoIcon = faListSquares;

  todos$!: Observable<any>;
  todosRef$!: AngularFireList<any>;

  uid: any;


  constructor(
    private router: Router,
    private store: Store,
    private authService: AuthService,
    private db: AngularFireDatabase,
    private todoService: TodoService
  ) {
  }

  ngOnInit() {
    this.authService.auth$.subscribe();
    this.store.select('user').subscribe((user: any) => {
      this.user = user;
    });

    this.getMeals();
  }

  getMeals() {
    this.authService.authState.subscribe((val: any) => {
      this.todos$ = this.db.list(`todos/${val.uid}`).valueChanges();
      this.todosRef$ = this.db.list(`todos/${val.uid}`);
      this.todos$ = this.todosRef$.snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({key: c.payload.key, ...c.payload.val()}))),
        tap(next => this.store.set('todos', next)),
      )
      this.uid = val.uid;
    })
  }

  async logOut() {
    await this.authService.logout();
    await this.router.navigate(['auth/login'])
  }


  async removeMeal(value: any) {
    await this.todoService.removeItem(this.uid, value.key);
  }

}
