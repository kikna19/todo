import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../shared/service/auth.service";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'login',
  styleUrls: ['login.component.scss'],
  template: `
    <auth-form (submitted)="login($event)"
               (checkValid)="checkDisable($event)">
      <h1>login form</h1>
      <button
        mat-button
        type="submit"
        [disabled]="btnStatus">
        login
      </button>
      <p>{{error}}</p>
      <div>
        <a
          routerLink="/auth/register"
          routerLinkActive="active">
          not registered?</a>
      </div>
    </auth-form>
  `,
})

export class LoginComponent implements OnInit {

  error: any;
  btnStatus: boolean = true;


  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {

  }

  async login(event: FormGroup) {
    const {email, password}: any = event;

    try {
      await this.authService.login(email, password)
      await this.router.navigate(['/todo']);
    } catch (err) {
      this.error = err;
    }
  }

  checkDisable(value: boolean) {
    this.btnStatus = value;
  }


}
