import React from 'react';
import { Card, CardActionArea, CardActions, CardContent, Button, Typography } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const TodoItem = ({ post, onEdit, onDelete }) => {
    return (
        <Card sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {post.body}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ display: "flex", justifyContent: "end" }}>
                <Button variant="contained" color="success" onClick={() => onEdit(post)}>
                    <BorderColorIcon />
                </Button>
                <Button variant="outlined" color="error" onClick={() => onDelete(post.id)}>
                    <DeleteForeverIcon />
                </Button>
            </CardActions>
        </Card>
    );
};

export default TodoItem;
