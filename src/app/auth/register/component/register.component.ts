import {Component} from "@angular/core";
import {AuthService} from "../../shared/service/auth.service";
import {FormGroup} from "@angular/forms";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'register',
  styleUrls: ['register.component.scss'],
  template: `
    <auth-form (submitted)="register($event)"
               (checkValid)="checkDisable($event)">
      <h1>register form</h1>
      <button
        mat-button
        type="submit"
        [disabled]="btnStatus">
        register
      </button>
      <p>{{error}}</p>
      <div>
        <a routerLink="/auth/login"
           routerLinkActive="active">
          already have account?</a>
      </div>
    </auth-form>
  `,
})

export class RegisterComponent {

  error: any;
  btnStatus: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  async register(event: FormGroup) {
    const {email, password}: any = event;
    try {
      await this.authService.register(email, password);
      await this.router.navigate(['/todo'])

    } catch (err) {
      this.error = err;
    }
  }

  checkDisable(value: boolean) {
    this.btnStatus = value;
  }
}
