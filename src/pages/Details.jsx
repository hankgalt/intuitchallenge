import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import titleize from 'titleize';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { detailActions } from '../actions/detail.actions';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    card: {
        margin: 10,
        height: 500
    },
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

const Marker = ({ text }) => <div><h3>{titleize(text)}</h3></div>;

const Map = ({ center, zoom, name }) => {
    return (
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.GOOGLE_API_KEY }}
            defaultCenter={center}
            defaultZoom={zoom}
          >
            <Marker
              lat={center[0]}
              lng={center[1]}
              text={name}
            />
          </GoogleMapReact>
        </div>
    );
}

const Details = () => {
    const classes = useStyles();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const detail = useSelector(state => state.detail);

    const handleChange = (event) => {
        if (event.target.checked) {
            dispatch(detailActions.save(detail.id, detail.name));
        } else {
            dispatch(detailActions.unSave(detail.id));
        }
    };

    useEffect(() => {
        const id = pathname.replace('/', '');
        dispatch(detailActions.fetchDetails(id));
        dispatch(detailActions.fetchLocations(id));
    }, []);

    if (!detail.id) {
        return (
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography align="center">{`${pathname} details`}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Link to="/">
                            <Typography align="center">{"Home"}</Typography>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        );
    }

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
                            <Typography align="center">{`${titleize(detail.name)}`}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Card className={classes.card}>
                                <CardMedia
                                    component="img"
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${detail.id}.png`}
                                    title={titleize(detail.name)}
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={4}>
                                    {detail.height && <Attribute label={`Height`} value={detail.height}/>}
                                </Grid>
                                <Grid item xs={4}>
                                    {detail.weight && <Attribute label={`Weight`} value={detail.weight}/>}
                                </Grid>
                                <Grid item xs={4}>
                                    {detail.species && <Attribute label={`Species`} value={titleize(detail.species.name)}/>}
                                </Grid>
                                <Grid item xs={4}>
                                    <h4>{`Save: `}</h4>
                                </Grid>
                                <Grid item xs={4}>
                                    <Checkbox
                                        checked={detail.saved}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'save' }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    {detail.forms && <ListAttribute name={detail.name} label={`Forms`} values={detail.forms}/>}
                                </Grid>
                                <Grid item xs={12}>
                                    {detail.types && <ListAttribute name={detail.name} label={`Types`} type={`type`} values={detail.types}/>}
                                </Grid>
                                <Grid item xs={12}>
                                    {detail.abilities && <ListAttribute name={detail.name} label={`Abilities`} type={`ability`} values={detail.abilities}/>}
                                </Grid>
                                <Grid item xs={12}>
                                    {detail.stats && <ListAttribute name={detail.name} label={`Stats`} type={`stat`} values={detail.stats}/>}
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
                        <Grid item xs={12}>
                            {detail.locations && detail.locations.length > 0 && <Map center={detail.locations[0]} zoom={18} name={detail.name}/>}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Details
