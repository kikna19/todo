import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {tap} from "rxjs/operators";
import {Store} from "../../../../store";

export interface User {
  email: any;
  uid: any,
  authenticated: boolean,
}

@Injectable()
export class AuthService {

  uid:any;

  auth$ = this.authState.pipe(
    tap(next => {
      if (!next) {
        this.store.set('user', null)
        return
      }
      const user: User = {
        email: next.email,
        uid: next.uid,
        authenticated: true,
      }
      this.store.set('user', user);
    })
  )

  constructor(
    private af: AngularFireAuth,
    private store: Store
  ) {
  }

  get authState() {
    return this.af.authState;
  }

  get userUid() {
    return this.af.authState.subscribe((user: any) => {
      this.uid = user.uid;
    })
  }

  login(email: string, password: string) {
    return this.af.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string) {
    return this.af.createUserWithEmailAndPassword(email, password)
  }

  logout(){
    return this.af.signOut();
  }
}
