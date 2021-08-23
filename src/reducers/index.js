import { combineReducers } from 'redux';
import { pokemons } from './list.reducer';

const rootReducer = combineReducers({
    pokemons
});

export default rootReducer;