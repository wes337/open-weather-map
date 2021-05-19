import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { City } from '../../city';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  state: Observable<any>;
  results: City[] = [];
  query: string;
  loading: boolean;
  error: string;

  constructor(private store: Store<any>) {
    this.state = store.pipe(select('store'));
    this.state.subscribe(({ results, query, loading, error, selected }) => {
      this.loading = loading;
      this.error = error;
      this.query = query;
      this.results = results;
    });
  }

  waitingForInput(): boolean {
    return !!(!this.query && this.results?.length === 0);
  }

  resultsFound(): boolean {
    return this.results?.length > 0;
  }

  noResultsFound(): boolean {
    return !!(this.query && this.results?.length === 0);
  }
}
