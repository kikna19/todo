import {BehaviorSubject, Observable} from "rxjs";
import {distinctUntilChanged, pluck} from "rxjs/operators";


export class Store {
  store = new BehaviorSubject<any>('');
  store$: Observable<any> = this.store.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.store.value;
  }

  select(name: string) {
    return this.store$.pipe(pluck(name))
  }

  set(name: string, state: any) {
    this.store.next({...this.value, [name]: state})
  }

}
