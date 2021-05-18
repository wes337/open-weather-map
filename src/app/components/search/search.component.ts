import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { WeatherService } from '../../weather.service';
import { SET_SEARCH_QUERY } from '../../reducer';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchQuery: string;
  constructor(
    private store: Store<any>,
    private weatherService: WeatherService
  ) {}

  search(searchForm: NgForm) {
    if (searchForm.invalid) {
      return;
    }
    console.log('here');
    this.weatherService.find(this.searchQuery).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        if (err?.error?.message) {
          console.error(err.error.message);
          return;
        }
        throw err;
      },
      () => {}
    );
    this.store.dispatch({ type: SET_SEARCH_QUERY, payload: this.searchQuery });
  }
}
