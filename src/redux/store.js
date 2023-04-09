import { createStore } from 'redux';

const initialState = {
  movies: [],
  totalPages: 0,
  currentPage: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_MOVIES':
      return {
        ...state,
        movies: action.payload.movies,
        totalPages: action.payload.totalPages,
        currentPage: 1,
      };
    case 'ADD_MOVIES':
      return {
        ...state,
        movies: [...state.movies, ...action.payload.movies],
        currentPage: state.currentPage + 1,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
