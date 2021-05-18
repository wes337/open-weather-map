import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  search: Observable<any>;
  results: any[] = [];
  query: string;
  loading: boolean;
  error: string;

  constructor(private store: Store<any>) {
    this.search = store.pipe(select('search'));
    this.search.subscribe(({ results, query, loading, error }) => {
      this.loading = loading;
      this.error = error;
      this.results = results;
      this.query = query;
    });
  }

  resultsFound() {
    return this.results?.length > 0;
  }

  noResultsFound() {
    return this.query && this.results?.length === 0;
  }
}
