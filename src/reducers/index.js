import { combineReducers } from 'redux';
import { pokemons } from './list.reducer';
import { detail } from './detail.reducer';

const rootReducer = combineReducers({
    pokemons,
    detail
});

export default rootReducer;