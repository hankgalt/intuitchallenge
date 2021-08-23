import React from 'react';
import { Link } from 'react-router-dom';
import titleize from 'titleize';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
}));

const ListAttribute = ({name, label, type, values}) => {
    return (
        <Grid container>
            <Grid item xs={2}>
                <h4>{`${label}: `}</h4>
            </Grid>
            <Grid item xs={10}>
                <Grid container>
                    {values.map(val => (
                        <Grid key={`${name}-${type ? val[type].name : val.name}`} item xs={2}>
                            <h4>{`${type ? titleize(val[type].name) : titleize(val.name)}`}</h4>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}

const Attribute = ({ label, value }) => {
    return (
        <Grid container>
            <Grid item xs={4}>
                <h4>{`${label}: `}</h4>
            </Grid>
            <Grid item xs={8}>
                <h4>{`${value ? value : ''}`}</h4>
            </Grid>
        </Grid>
    );
}

const Details = () => {
    const classes = useStyles();

    const handleChange = (event) => {
        console.log(event.target.checked);
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Link to="/">
                        <Typography align="center">{"Home"}</Typography>
                    </Link>
                </Grid>
                <Grid item xs={5}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography align="center">{`${titleize('detail')}`}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Card className={classes.card}>
                                <CardMedia
                                    component="img"
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png`}
                                    title={titleize('detail')}
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={4}>
                                    {<Attribute label={`Height`} value={`Height`}/>}
                                </Grid>
                                <Grid item xs={4}>
                                    {<Attribute label={`Weight`} value={`Weight`}/>}
                                </Grid>
                                <Grid item xs={4}>
                                    {<Attribute label={`Species`} value={`Species`}/>}
                                </Grid>
                                <Grid item xs={4}>
                                    <h4>{`Save: `}</h4>
                                </Grid>
                                <Grid item xs={4}>
                                    <Checkbox
                                        checked={false}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'save' }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    {<ListAttribute name={'name'} label={`Abilities`} type={`ability`} values={[{ability: {name: 'kungfu'}}]}/>}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={7}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography align="center">{`${titleize('location')}`}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Details
