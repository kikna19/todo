import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AuthService} from "../../../auth/shared/service/auth.service";
import {Store} from "../../../../store";
import {filter, map, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Injectable()
export class TodoService {

  uid: any;

  constructor(
    private db: AngularFireDatabase,
    private store: Store,
    private authService: AuthService,
  ) {
    this.authService.userUid;

  }

  get userUid() {
    return this.authService.authState.subscribe((user: any) => {
      this.uid = user.uid;
    })
  }

  createItem(value: any) {
    this.db.list(`todos/${this.uid}`).push(value);
  }

  getItem(key: any) {
    if (!key) return of({});
    return this.store.select('todos').pipe(
      filter(Boolean),
      map((item: any) => item.find((meal: any) => meal.key === key))
    )
  }

  checkedItem(uid:any, key:any, value:any){
    return  this.db.object(`todos/${uid}/${key}`).update(value)
  }

  updateItem(value:any, key:string){
   return  this.db.object(`todos/${this.uid}/${key}`).update(value)
  }

  removeItem(uid:any,key:any){
    return this.db.object(`todos/${uid}/${key}`).remove()
  }
}
