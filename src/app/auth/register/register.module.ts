import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RegisterComponent} from "./component/register.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {MatButtonModule} from "@angular/material/button";

export const ROUTES: Routes = [
  {path: '', component: RegisterComponent}
]

@NgModule({
  declarations:[
    RegisterComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        SharedModule,
        MatButtonModule
    ]
})


export class RegisterModule{

}
