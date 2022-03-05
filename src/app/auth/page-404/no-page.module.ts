import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {NoPageComponent} from "./component/no-page.component";


const ROUTES: Routes = [
  {path: '', component: NoPageComponent}
]

@NgModule({
  declarations: [
    NoPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})

export class NoPageModule {

}
