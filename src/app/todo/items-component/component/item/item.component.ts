import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {faRemove} from "@fortawesome/free-solid-svg-icons/faRemove";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ItemsComponent} from "../items.component";


@Component({
  selector: 'item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['item.component.scss'],
  template: `
    <div class="item-container">
      <mat-checkbox
        (change)="onChecked()"
        [checked]="element.checked">
      </mat-checkbox>
      <div class="item" [routerLink]="getRoute(element)">
        <h2>{{element.name}}</h2>
        <div class="item__ingredients">
          <span *ngFor="let c of element.todos">
          {{c}}
        </span>
        </div>
      </div>
      <div class="delete">
        <div *ngIf="toggle; else showBtn" class="delete__ask">
          <button mat-button (click)="onRemove()">
            <fa-icon style="color: green" [icon]="yes"></fa-icon>
          </button>
          <button mat-button (click)="onToggle()">
            <fa-icon style="color: red" [icon]="no"></fa-icon>
          </button>
        </div>
        <ng-template #showBtn>
          <button mat-button (click)="onToggle()">
            <fa-icon style="color: red" [icon]="delete"></fa-icon>
          </button>
        </ng-template>
      </div>
    </div>
  `,
})

export class ItemComponent {

  toggle: boolean = false;
  delete = faTrash;
  no = faRemove;
  yes = faCheck;

  constructor(
    private snack: MatSnackBar
  ) {
  }

  @Input()
  uid: any;

  @Input()
  element: any;

  @Output()
  remove = new EventEmitter<any>();


  getRoute(item: any) {
    return [`../todo`, item.key]
  }


  onRemove() {
    this.remove.emit(this.element);
  }

  onToggle() {
    this.toggle = !this.toggle;
  }

  onChecked() {
    this.snack.openFromComponent(ItemsComponent, {
      data: {item: this.element, uid: this.uid}
    })
  }




}
