import {AbstractControl, FormControl} from "@angular/forms";

export class FormValidator {
  static checkCapital(control: AbstractControl) {
    const regexp = new RegExp('^[A-Z]');
    const valid = regexp.test(control.value);
    return valid ? null : {capital: true};
  }

  static checkSpace(control: FormControl) {
    if (control.value.includes(' ')) {
      return {noSpace: true}
    }
    return null;
  }

  static checkLength(control: FormControl) {
    if (control.value.length < 8 && control.value.length > 0) {
      return {minLength: true}
    }
    if (control.value.length > 20) {
      return {maxLength: true}
    }
    if (control.value.length > 40) {
      return {maxEmailLength: true}
    }
    return null;
  }

  static maxLengthArray(max: number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value.length >= max)
        return {max: true}
      return null
    }

  }
}
