import {Component} from "@angular/core";

@Component({
  selector: 'no-page',
  template: `
    <div>
      page 404
     <a routerLink="/auth/login">go home</a>
    </div>
  `,
})

export class NoPageComponent {

}
