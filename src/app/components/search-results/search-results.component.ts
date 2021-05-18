import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { WeatherService } from '../../weather.service';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  searchQuery$: Observable<string>;
  searchQuery: string;
  searchResults: any = <any>{};
  msg: string;

  constructor(
    private store: Store<any>,
    private weatherService: WeatherService
  ) {
    this.searchQuery$ = store.pipe(select('searchQuery'));
    this.searchQuery$.subscribe((searchQuery) => {
      this.searchQuery = searchQuery;
      this.searchWeather(searchQuery);
    });
  }

  searchWeather(searchQuery: string) {
    this.msg = '';
    this.searchResults = {};

    // this.weatherService.find(searchQuery).subscribe(
    //   (res) => {
    //     console.log(res);
    //     this.searchResults = res;
    //   },
    //   (err) => {
    //     if (err?.error?.message) {
    //       this.msg = err.error.message;
    //       return;
    //     }
    //     throw err;
    //   },
    //   () => {}
    // );
  }

  resultFound() {
    return this.searchResults?.list.length > 0;
  }
}
