import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { WeatherService } from '../../weather.service';

@Component({
  selector: 'current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent {
  searchQuery$: Observable<string>;
  loc: string;
  currentWeather: any = <any>{};
  searchResults: any = <any>{};
  msg: string;

  constructor(
    private store: Store<any>,
    private weatherService: WeatherService
  ) {
    this.searchQuery$ = store.pipe(select('searchQuery'));
    this.searchQuery$.subscribe((loc) => {
      this.loc = loc;
      this.searchWeather(loc);
    });
  }

  searchWeather(loc: string) {
    this.msg = '';
    this.currentWeather = {};
    this.weatherService.getCurrentWeather(loc).subscribe(
      (res) => {
        this.currentWeather = res;
      },
      (err) => {
        if (err?.error?.message) {
          alert(err.error.message);
          this.msg = err.error.message;
          return;
        }
        alert('Failed to get weather.');
      },
      () => {}
    );

    this.weatherService.find(loc).subscribe(
      (res) => {
        console.log(res);
        this.searchResults = res;
      },
      (err) => {
        if (err?.error?.message) {
          alert(err.error.message);
          this.msg = err.error.message;
          return;
        }
        alert('Failed to get weather.');
      },
      () => {}
    );
  }

  resultFound() {
    return Object.keys(this.currentWeather).length > 0;
  }
}
