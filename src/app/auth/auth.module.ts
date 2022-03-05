import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AppRoutingModule} from "../app-routing.module";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../environments/environment.prod";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "./shared/shared.module";
import {LoginModule} from "./login/login.module";
import {TodoGuard} from "./shared/guard/todo.guard";

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'login'},
      {path: 'login', loadChildren: () => import('../auth/login/login.module').then(m => m.LoginModule)},
      {path: 'register', loadChildren: () => import('../auth/register/register.module').then(m => m.RegisterModule)},
    ]
  },
  {path: 'todo', loadChildren: () => import('../todo/todo.module').then(m => m.TodoModule), canActivate: [TodoGuard]},
  {path: '**', loadChildren: () => import('../auth/page-404/no-page.module').then(m => m.NoPageModule)}
]

@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    SharedModule.forRoot(),
    RouterModule.forRoot(ROUTES),
    LoginModule
  ],

})

export class AuthModule {

}
