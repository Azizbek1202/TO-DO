import React from 'react';
import { Grid } from '@mui/material';
import TodoItem from './TodoItem';

const TodoList = ({ items, onEdit, onDelete }) => {
    return (
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 2, maxWidth: 1000 }}>
            {items.map((post) =>
                <Grid item xs={12} sm={6} lg={4} key={post.id}>
                    <TodoItem post={post} onEdit={onEdit} onDelete={onDelete} />
                </Grid>
            )}
        </Grid>
    );
};

export default TodoList;
