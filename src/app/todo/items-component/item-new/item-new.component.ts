import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {TodoService} from "../../service/todo-service/todo.service";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'item-new',
  template: `
    <item-form
      (create)="createTodo($event)"
      (update)="updateTodo($event)"
      [todo]="todo$ | async">
    </item-form>
  `,

})

export class ItemNewComponent implements OnInit {

  todo$!: Observable<any>;


  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.todo$ = this.route.params.pipe(
      switchMap(param => this.todoService.getItem(param.id)),
    );
  }

  async createTodo(value: any) {
    await this.todoService.createItem(value);
    this.router.navigate(['/todo'])
  }

  async updateTodo(value: any) {
    const id = this.route.snapshot.params.id;
    await this.todoService.updateItem(value, id);
    this.router.navigate(['/todo'])
  }


}
