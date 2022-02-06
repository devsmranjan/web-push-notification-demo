import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private _swPush: SwPush) { }

  ngOnInit() {
    this.requestSubscription();
  }

  requestSubscription = () => {
    if (!this._swPush.isEnabled) {
      console.log("Notification is not enabled.");
      return;
    }

    this._swPush.requestSubscription({
      serverPublicKey: '<VAPID_PUBLIC_KEY_FROM_BACKEND>'
    }).then((_) => {
      console.log(JSON.stringify(_));
    }).catch((_) => console.log);
  };

}
