import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./component/login.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";


export const ROUTES: Routes = [
  {path: '', component: LoginComponent}
]

@NgModule({

  declarations: [
    LoginComponent,
  ],

    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        SharedModule,
        MatButtonModule,
    ],

})


export class LoginModule {

}
