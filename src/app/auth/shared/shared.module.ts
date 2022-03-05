import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AuthFormComponent} from "./component/auth-form.component";
import {AuthService} from "./service/auth.service";
import {RouterModule} from "@angular/router";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {ReactiveFormsModule} from "@angular/forms";
import {TodoGuard} from "./guard/todo.guard";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";

@NgModule({
  declarations: [
    AuthFormComponent
  ],
  exports: [
    AuthFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService,
        TodoGuard
      ]
    }
  }

}
