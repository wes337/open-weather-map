import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { SET_SELECTED } from 'src/app/store';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  state: Observable<any>;
  results: any[] = [];
  query: string;
  loading: boolean;
  error: string;

  constructor(private store: Store<any>) {
    this.state = store.pipe(select('store'));
    this.state.subscribe(({ results, query, loading, error }) => {
      this.loading = loading;
      this.error = error;
      this.results = results;
      this.query = query;
    });
  }

  select(id: string) {
    this.store.dispatch({
      type: SET_SELECTED,
      payload: id,
    });
  }

  resultsFound() {
    return this.results?.length > 0;
  }

  noResultsFound() {
    return this.query && this.results?.length === 0;
  }
}
