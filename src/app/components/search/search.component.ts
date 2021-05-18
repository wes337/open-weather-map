import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { WeatherService } from '../../weather.service';
import {
  SET_SEARCH_BEGIN,
  SET_SEARCH_SUCCESS,
  SET_SEARCH_FAILURE,
} from '../../reducer';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  query: string;
  constructor(
    private store: Store<any>,
    private weatherService: WeatherService
  ) {}

  search(searchForm: NgForm) {
    if (searchForm.invalid) {
      return;
    }

    this.store.dispatch({
      type: SET_SEARCH_BEGIN,
      payload: this.query,
    });

    this.weatherService.find(this.query).subscribe(
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
