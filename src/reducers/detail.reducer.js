import { detailConstants } from '../constants/detail.constants';

const initialState = {
    loading: false,
    saved: false
};

export function detail(state = initialState, action) {
    switch (action.type) {
        case detailConstants.DETAIL_FETCH_REQUEST:
            return { ...state, loading: true };
        case detailConstants.DETAIL_FETCH_SUCCESS:
            return { ...state, ...action.data, loading: false };
        case detailConstants.DETAIL_FETCH_FAILURE:
            return { ...state, loading: false };
        case detailConstants.LOCATION_FETCH_REQUEST:
            return { ...state, loading: true };
        case detailConstants.LOCATION_FETCH_SUCCESS:
            return { ...state, locations: action.data, loading: false };
        case detailConstants.LOCATION_FETCH_FAILURE:
            return { ...state, loading: false };
        case detailConstants.SAVE_POKE:
            return { ...state, saved: true};
        case detailConstants.UNSAVE_POKE:
            return { ...state, saved: false};
        default:
            return state
    }
}