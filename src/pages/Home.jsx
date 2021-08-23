import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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

const Home = () => {
    const classes = useStyles();

    const handleChange = (event) => {
        console.log(event.target.checked);
    };

    const handleSearch = (event) => {
        console.log(event.target.value);
    };

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
                                        checked={false}
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
                        {[1,2,3,4,5,6,7,8,9,0,11].map(poke => (
                            <Grid key={poke} item>
                                <Typography align="center">{poke}</Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Home
