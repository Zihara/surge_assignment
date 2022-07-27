import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import {Link} from "react-router-dom";

export default function NoteCard(props) {

    const { note } = props;

    return (
        <Grid item xs={12} md={6} >
            <Link to={`/note/${note._id}`} className={"link"}>
            <CardActionArea component="a" elevation={12}>
                <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography component="h2" variant="h5">
                            {note.title}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                            {note.description}
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                            Continue reading...
                        </Typography>
                    </CardContent>
                </Card>
            </CardActionArea>
            </Link>
        </Grid>
    );
}

NoteCard.propTypes = {
    note: PropTypes.shape({
        date: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        imageLabel: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
};