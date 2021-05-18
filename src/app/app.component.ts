import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'nordea-open-weather-map';
  searchQuery$: Observable<string>;
  searchQuery: string;

  constructor(private store: Store<any>) {
    this.searchQuery$ = store.pipe(select('searchQuery'));
    this.searchQuery$.subscribe((searchQuery) => {
      this.searchQuery = searchQuery;
    });
  }
}
