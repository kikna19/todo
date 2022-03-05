import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from "@angular/core";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TodoService} from "../../../service/todo-service/todo.service";
import {TodoValidator} from "./todo-validator/todo.validator";
import {faRemove} from "@fortawesome/free-solid-svg-icons/faRemove";
import {Router} from "@angular/router";


@Component({
  selector: 'item-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['item-form.component.scss'],
  template: `
    <mat-toolbar-row class="toolbar">
      <form [formGroup]="form" class="toolbar__form">
        <h2 *ngIf="!checkTodo">create ToDo</h2>
        <h2 *ngIf="checkTodo">update ToDo</h2>
        <div class="todo-details">
          <div class="todo-details__name">
            <label for="name">name</label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Egg"
              formControlName="name">
          </div>
          <div class="todo-details__add">
            <button
              mat-button
              type="button"
              [disabled]="todos.length == 6"
              (click)="addTodos()">
              add item
            </button>
          </div>
        </div>

        <div class="todo-items">
          <div
            class="todo-items__inputs"
            *ngFor="let c of todos.controls;
             index as i" formArrayName="todos">
            <input
              type="text"
              placeholder="sal"
              [formControlName]="i">
            <button
              mat-mini-fab
              (click)="removeIndex(i)">
              <fa-icon
                [icon]="remove"></fa-icon>
            </button>
          </div>
        </div>
        <div class="todo-btns">
          <button
            mat-button
            [disabled]="!form.valid"
            (click)="createTodo()"
            *ngIf="!checkTodo">
            create todo
          </button>
          <button
            mat-button
            [disabled]="!form.valid"
            (click)="updateTodo()"
            *ngIf="checkTodo">
            update todo
          </button>
          <button
            mat-button
            (click)="cancel()">
            cancel
          </button>
        </div>
      </form>
    </mat-toolbar-row>
  `,
})

export class ItemFormComponent implements OnInit, OnChanges {

  form: FormGroup;
  uid: any;
  remove = faRemove;

  @Input()
  todo: any;

  @Output()
  update = new EventEmitter<any>();

  @Output()
  create = new EventEmitter<any>();


  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      name: ['',
        TodoValidator.todoLength],
      todos: this.fb.array(
        [this.fb.control([''],
          [Validators.minLength(2), Validators.required],)],
        [TodoValidator.maxLengthArray(6)]),
      checked: [false],
    });

  }

  ngOnInit() {
    this.todoService.userUid;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['todo']) {
      if (this.checkTodo) {
        this.todos.clear();
        this.form.get('name')?.setValue(this.todo.name);
        this.todo.todos.forEach((element: any) => {
          this.todos.push(this.fb.control(element, [TodoValidator.todoArrayLength, Validators.required]))
        })
      }
    }
  }

  get checkTodo() {
    if (!this.todo) return false;
    return Object.keys(this.todo).length > 0;
  }


  get todos() {
    return this.form.get('todos') as FormArray;
  }


  addTodos() {
    this.todos.push(new FormControl([''],
      [TodoValidator.todoArrayLength, Validators.required]))
  }

  createTodo() {
    if (this.form.valid) {
      this.create.emit(this.form.value)
    }

  }

  updateTodo() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeIndex(index: number) {
    const todos = this.form.get('todos') as FormArray;
    todos.removeAt(index)
  }

  cancel() {
    this.router.navigate(['todo'])
  }

}
