import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {Store} from "../../../../store";
import {AuthService} from "../service/auth.service";
import {map} from "rxjs/operators";


@Injectable()
export class TodoGuard implements CanActivate {


  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  canActivate() {
    return this.authService.authState.pipe(
      map((value: any) => {
        if (!value) {
          this.router.navigate(['auth/login'])
          return false
        }
        return true
      })
    )
  }
}
