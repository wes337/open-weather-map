import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { SET_SELECTED } from '../../store';
import { City } from '../../city';

@Component({
  selector: 'weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent {
  @Input() city!: City;
  state: Observable<any>;
  selected: number | null;

  constructor(private store: Store<any>) {
    this.state = store.pipe(select('store'));
    this.state.subscribe(({ selected }) => {
      this.selected = selected;
    });
  }

  selectCity(id: number) {
    this.store.dispatch({
      type: SET_SELECTED,
      payload: id,
    });
  }

  getTimeString(dt: number) {
    return new Date(dt * 1000).toLocaleTimeString();
  }
}
