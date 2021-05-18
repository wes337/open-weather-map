export const initialState = {
  query: '',
  results: [],
  loading: false,
  error: null,
};

export const SET_SEARCH_BEGIN = 'SET_SEARCH_BEGIN';
export const SET_SEARCH_SUCCESS = 'SET_SEARCH_SUCCESS';
export const SET_SEARCH_FAILURE = 'SET_SEARCH_FAILURE';

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SEARCH_BEGIN: {
      return {
        ...state,
        loading: true,
        error: null,
        query: action.payload,
        results: [],
      };
    }
    case SET_SEARCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        results: action.payload,
      };
    }
    case SET_SEARCH_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
