import { detailConstants } from '../constants/detail.constants';
import { detailService } from '../services/detail.service';

export const detailActions = {
    fetchDetails,
    fetchLocations,
    save,
    unSave
};

function fetchDetails(id) {
    return dispatch => {
        dispatch(request({ id }));

        detailService.fetchDetails(id)
            .then(
                data => { 
                    dispatch(success(data));;
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(data) { return { type: detailConstants.DETAIL_FETCH_REQUEST, data } }
    function success(data) { return { type: detailConstants.DETAIL_FETCH_SUCCESS, data } }
    function failure(error) { return { type: detailConstants.DETAIL_FETCH_FAILURE, error } }
}

function fetchLocations(id) {
    return dispatch => {
        dispatch(request({ id }));

        detailService.fetchLocations(id)
            .then(
                data => { 
                    dispatch(success(data));;
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(data) { return { type: detailConstants.LOCATION_FETCH_REQUEST, data } }
    function success(data) { return { type: detailConstants.LOCATION_FETCH_SUCCESS, data } }
    function failure(error) { return { type: detailConstants.LOCATION_FETCH_FAILURE, error } }
}

function save(id, name) {
    detailService.save(id, name);
    return { type: detailConstants.SAVE_POKE };
}

function unSave(id) {
    detailService.unSave(id);
    return { type: detailConstants.UNSAVE_POKE };
}