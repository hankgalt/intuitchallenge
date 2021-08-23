import { listConstants } from '../constants/list.constants';
import { listService } from '../services/list.service';

export const listActions = {
    fetchList
};

function fetchList(offset, limit) {
    return dispatch => {
        dispatch(request({ offset, limit }));

        listService.fetchList(offset, limit)
            .then(
                data => { 
                    dispatch(success(data));;
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(data) { return { type: listConstants.LIST_FETCH_REQUEST, data } }
    function success(data) { return { type: listConstants.LIST_FETCH_SUCCESS, data } }
    function failure(error) { return { type: listConstants.LIST_FETCH_FAILURE, error } }
}
