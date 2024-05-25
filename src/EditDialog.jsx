import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const EditDialog = ({ open, onClose, post, onSubmit, onChange }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Post</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    id="title"
                    name="title"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={post.title}
                    onChange={onChange}
                />
                <TextField
                    margin="dense"
                    id="body"
                    name="body"
                    label="Body"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={post.body}
                    onChange={onChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onSubmit} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditDialog;
