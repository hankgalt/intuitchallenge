import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import PokeCard from '../components/PokeCard';
import { listActions } from '../actions/list.actions';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    header: {
        margin: theme.spacing(1),
        alignItems: "center",
        justifyContent: "center"
    },
    headerItem: {
        margin: theme.spacing(1)
    },
}));

const getId = (url) => {
    const items = url.split('/');
    let id = items[items.length - 1];
    if (id === '') id = items[items.length - 2];
    return id;
}

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const pokemons = useSelector(state => state.pokemons);

    const handleChange = (event) => {
        console.log(event.target.checked);
    };

    const handleSearch = (event) => {
        console.log(event.target.value);
    };

    useEffect(() => {
        dispatch(listActions.fetchList(pokemons.offset, pokemons.limit));
    }, []);

    return (
        <div className={classes.root}>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <Grid container className={classes.header}>
                        <Grid item className={classes.headerItem}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                    <Switch
                                        checked={pokemons.showSaved}
                                        onChange={handleChange}
                                        name="showSaved"
                                        color="primary"
                                    />
                                    }
                                    label="Show Saved"
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item className={classes.headerItem}>
                            <form noValidate autoComplete="off">
                                <TextField 
                                    id="search"
                                    label="Search field"
                                    value={''}
                                    type="search"
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={handleSearch} />
                            </form>
                        </Grid>
                    </Grid>
                    <Grid container>
                        {!pokemons.showSaved && pokemons.results.map(poke => (
                            <Grid key={poke.name} item>
                                <PokeCard name={poke.name} id={getId(poke.url)} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Home
