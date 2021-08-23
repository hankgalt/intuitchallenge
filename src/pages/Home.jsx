import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import PokeCard from '../components/PokeCard';
import { listActions } from '../actions/list.actions';

const limits = [
    {
      value: 20,
      label: '20',
    },
    {
      value: 30,
      label: '30',
    },
    {
      value: 40,
      label: '40',
    },
    {
      value: 50,
      label: '50',
    },
];

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
    button: {
        margin: theme.spacing(1),
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
        if (event.target.checked) {
            dispatch(listActions.showSaved());
        } else {
            dispatch(listActions.hideSaved());
        }
    };

    const handleSearch = (event) => {
        console.log(event.target.value);
    };

    const handleLimit = async (event) => {
        const limit = event.target.value;
        dispatch(listActions.fetchList(0, limit));
    };

    const paginate = async (event) => {
        if (event.currentTarget.value === 'previous') {
            const offset = pokemons.offset-2*pokemons.limit >= 0 ? pokemons.offset-2*pokemons.limit : 0;
            dispatch(listActions.fetchList(offset, pokemons.limit));
        } else if (event.currentTarget.value === 'next') {
            dispatch(listActions.fetchList(pokemons.offset, pokemons.limit));
        }
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
                            {!pokemons.showSaved && pokemons.previous && <Button variant="contained" value="previous" className={classes.button} onClick={(event) => { paginate(event) }}>Previous</Button>}
                        </Grid>
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
                        <Grid item className={classes.headerItem}>
                            <TextField
                                select
                                label="Select"
                                value={pokemons.limit}
                                onChange={handleLimit}
                            >
                                {limits.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item className={classes.headerItem}>
                            {!pokemons.showSaved && pokemons.next && <Button variant="contained" value="next" className={classes.button} onClick={(event) => { paginate(event) }}>Next</Button>}
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
