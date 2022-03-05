import {AbstractControl} from "@angular/forms";

export class TodoValidator {

  static todoLength(control: AbstractControl) {
    if (control.value.length < 2)
      return {todoMin: true}

    if (control.value.length > 10)
      return {todoMax: true}

    return null;

  }


  static todoArrayLength(control: AbstractControl) {
    if (control.value.length < 2)
      return {todoMin: true}

    if (control.value.length > 6)
      return {todoMax: true}

    return null;

  }


  static maxLengthArray(max: number) {
    return (control: AbstractControl): { [p: string]: any } | null => {
      if (control.value.length > max)
        return {noMax: true}
      return null
    }
  }
}
