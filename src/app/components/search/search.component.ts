import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { WeatherService } from '../../weather.service';
import {
  SET_SEARCH_BEGIN,
  SET_SEARCH_SUCCESS,
  SET_SEARCH_FAILURE,
} from '../../store';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  query: string;
  units: string = 'metric';

  constructor(
    private store: Store<any>,
    private weatherService: WeatherService
  ) {}

  search(searchForm: NgForm): void {
    if (searchForm.invalid) {
      return;
    }

    this.store.dispatch({
      type: SET_SEARCH_BEGIN,
      payload: this.query,
    });

    this.weatherService.find(this.query, this.units).subscribe(
      (res: any) => {
        this.store.dispatch({
          type: SET_SEARCH_SUCCESS,
          payload: res?.list || [],
        });
      },
      (err) => {
        if (err?.error?.message) {
          this.store.dispatch({
            type: SET_SEARCH_FAILURE,
            payload: err?.error?.message,
          });
          return;
        }
        throw err;
      }
    );
  }
}
