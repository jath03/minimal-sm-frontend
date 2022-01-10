import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function Post(props) {
    const [likes, setLikes] = useState(props.post.likes);

    const handleLike = (event) => {
        fetch('http://localhost:8787/like', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: props.post_id.toString()
        });
        setLikes(likes + 1);
    }

    return (
        <Card sx={{ my: 5 }}>
            { props.post.image == "" ? null :
            <CardMedia
                component="img"
                height="200"
                image={props.post.image}
            />
            }
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    { props.post.title }
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    { props.post.content }
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton aria-label="Like" onClick={handleLike}>
                    <FavoriteIcon />
                </IconButton>
                <Typography varient="h6">{likes}</Typography>
            </CardActions>
        </Card>
    );
}
