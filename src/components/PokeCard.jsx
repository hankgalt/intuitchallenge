import React from 'react';
import { Link } from 'react-router-dom';
import titleize from 'titleize';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        width: 120,
        height: 160,
        margin: 10,
        padding: 5,
    },
    title: {
        fontSize: 18,
        textAlign: 'center'
    },
});

export default function PokeCard(props) {
    const { name, id } = props;
    const classes = useStyles();

    return (
        <Link to={`/${id}`}>
            <Card key={id} className={classes.root}>
                <CardMedia
                    className={classes.media}
                    component="img"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                    title={titleize(name)}
                />
                <CardContent>
                    <Typography className={classes.title}>
                        {titleize(name)}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}
