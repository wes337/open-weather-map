import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apiKey: string = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  find(searchQuery: string) {
    return this.http.get(
      `${environment.apiUrl}/find?q=${searchQuery}&type=like&sort=population&cnt=30&appid=${apiKey}`
    );
  }
}
