import { Component, DoCheck } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { SET_SELECTED } from 'src/app/store';
import { City } from '../../city';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements DoCheck {
  state: Observable<any>;
  results: City[] = [];
  selected: number | null;
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
      this.selected = selected;
    });
  }

  select(id: number) {
    this.store.dispatch({
      type: SET_SELECTED,
      payload: id,
    });
  }

  resultsFound(): boolean {
    return this.results?.length > 0;
  }

  noResultsFound(): boolean {
    return !!(this.query && this.results?.length === 0);
  }

  ngDoCheck(): void {
    if (!this.selected && this.results?.length === 1) {
      this.select(this.results[0].id);
    }
  }
}
