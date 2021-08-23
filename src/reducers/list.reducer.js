import { listConstants } from '../constants/list.constants';

const initialState = {
    results: [],
    count: 0,
    previous: null,
    next: null,
    offset: 0,
    limit: 20,
    loading: false,
    savedList: {},
    showSaved: false
};

export function pokemons(state = initialState, action) {
    switch (action.type) {
        case listConstants.LIST_FETCH_REQUEST:
            return { ...state, loading: true };
        case listConstants.LIST_FETCH_SUCCESS:
            return { ...state, ...action.data, loading: false };
        case listConstants.LIST_FETCH_FAILURE:
            return { ...state, loading: false };
        case listConstants.SHOW_SAVED:
            return { ...state, showSaved: true, savedList: action.data};
        case listConstants.HIDE_SAVED:
            return { ...state, showSaved: false};
        default:
            return state
    }
}
