import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'nordea-open-weather-map';
  state: Observable<any>;
  cache: any;

  constructor(private store: Store<any>) {
    this.state = store.pipe(select('store'));
    this.state.subscribe((state) => {
      localStorage.setItem('cachedState', JSON.stringify(state));
    });
  }
}
