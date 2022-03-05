import {Component, EventEmitter, Inject, OnInit, Output, Renderer2} from "@angular/core";
import {TodoService} from "../../service/todo-service/todo.service";
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";
import {faRemove} from "@fortawesome/free-solid-svg-icons/faRemove";

@Component({
  selector: 'meals',
  styleUrls: ['items.component.scss'],
  template: `
    <div class="check">
      <span>save changes?</span>
      <button
        class="check__yes"
        (click)="onChecked()"
        mat-button>
        yes
      </button>
      <button
        class="check__no"
        (click)="onClose()"
        mat-button>
        no
      </button>
    </div>
  `,
})

export class ItemsComponent implements OnInit {

  close = faRemove;

  @Output()
  notSave = new EventEmitter<any>();

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) private data: { item: any, uid: any },
    private snackRef: MatSnackBarRef<ItemsComponent>,
    private todoService: TodoService,
  ) {
  }

  ngOnInit() {
    this.data.item.checked = !this.data.item.checked;
  }

  onChecked() {
    this.todoService.checkedItem(this.data.uid, this.data.item.key, this.data.item);
    this.snackRef.dismiss();
  }

  onClose() {
    this.snackRef.dismiss();
  }
}
