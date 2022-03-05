import {
  AfterContentInit,
  AfterViewInit,
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  ViewEncapsulation
} from "@angular/core";
import {AuthService} from "../service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormValidator} from "./form-validator/form-validator";

@Component({
  selector: 'auth-form',
  styleUrls: ['auth-form.component.scss'],
  template: `
    <mat-toolbar-row>
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form">
        <ng-content select="h1"></ng-content>
        <mat-form-field appearance="outline">
          <mat-label>email</mat-label>
          <input
            matInput
            type="text"
            formControlName="email">
          <mat-error *ngIf="checkForm.email.errors?.email">Enter Email</mat-error>
          <mat-error *ngIf="checkForm.email.errors?.required">Email is required</mat-error>
          <mat-error *ngIf="checkForm.password.errors?.minLength">Min length is 8</mat-error>
          <mat-error *ngIf="checkForm.password.errors?.maxEmailLength">Max length is 40</mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>password</mat-label>
          <input
            matInput
            type="password"
            formControlName="password">
          <mat-error *ngIf="checkForm.password.errors?.capital">Fist letter must be uppercase</mat-error>
          <mat-error *ngIf="checkForm.password.errors?.noSpace">No space in letters</mat-error>
          <mat-error *ngIf="checkForm.password.errors?.minLength">Min length is 8</mat-error>
          <mat-error *ngIf="checkForm.password.errors?.maxLength">Max length is 20</mat-error>
        </mat-form-field>
        <ng-content select="button"></ng-content>
        <ng-content select="p"></ng-content>
      </form>
      <ng-content select="div"></ng-content>
    </mat-toolbar-row>
  `,
})

export class AuthFormComponent {

  @Output()
  checkValid = new EventEmitter<boolean>();

  @Output()
  submitted = new EventEmitter<FormGroup>();

  form: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email: ['', [
        Validators.email,
        Validators.required,
        FormValidator.checkLength]],
      password: ['', [
        Validators.required,
        FormValidator.checkCapital,
        FormValidator.checkSpace,
        FormValidator.checkLength,
      ]],
    })
    this.form.statusChanges.subscribe(val => {
      if (val == 'VALID') {
        this.checkValid.emit(false)
      } else {
        this.checkValid.emit(true)
      }
    })
  }


  get checkForm() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value)
    }
  }

}
