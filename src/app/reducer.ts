import { Action } from '@ngrx/store';

export const initialState = '';

export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      state = action.payload;
      return state;
    default:
      return state;
  }
};
