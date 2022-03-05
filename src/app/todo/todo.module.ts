import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {TodoComponent} from "./components/todo-component/todo.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {SharedModule} from "../auth/shared/shared.module";
import {ItemsComponent} from "./items-component/component/items.component";
import {ItemFormComponent} from "./items-component/component/item-form/item-form.component";
import {ItemComponent} from "./items-component/component/item/item.component";
import {ItemNewComponent} from "./items-component/item-new/item-new.component";
import {ReactiveFormsModule} from "@angular/forms";
import {TodoService} from "./service/todo-service/todo.service";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDividerModule} from "@angular/material/divider";


const ROUTES: Routes = [
  {
    path: '', component: TodoComponent, children: [
      {path: 'new', component: ItemNewComponent},
      {path: ':id', component: ItemNewComponent},
    ]
  },

]

@NgModule({
  declarations: [
    TodoComponent,
    ItemsComponent,
    ItemFormComponent,
    ItemComponent,
    ItemNewComponent
  ],
    imports: [
        RouterModule.forChild(ROUTES),
        CommonModule,
        MatSidenavModule,
        FontAwesomeModule,
        MatButtonModule,
        MatToolbarModule,
        ReactiveFormsModule,
        SharedModule,
        MatProgressBarModule,
        MatInputModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatDividerModule
    ],
  providers:[
    TodoService
  ]
})

export class TodoModule {

}
