import { Button, Card, CardActionArea, CardActions, CardContent, Stack, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoApp = () => {
    const [item, setItem] = useState([]);
    const [editData, setEditData] = useState({ title: "", body: "", id: null });
    const [open, setOpen] = useState(false);

    const getItem = async () => {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
            setItem(response?.data);
        } catch (error) {
            console.log("Error");
        }
    };

    useEffect(() => {
        getItem();
    }, []);

    const [formData, setFormData] = useState({
        title: "",
        body: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://jsonplaceholder.typicode.com/posts", formData);
            setItem([response.data, ...item]);
            setFormData({ title: "", body: "" });
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async () => {
        try {
            const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${editData.id}`, {
                title: editData.title,
                body: editData.body
            });
            setItem(item.map((post) => (post.id === editData.id ? response.data : post)));
            setOpen(false);
            setEditData({ title: "", body: "", id: null });
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    const deletePost = async (id) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
            setItem(item.filter((post) => post.id !== id));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const openEditDialog = (post) => {
        setEditData(post);
        setOpen(true);
    };

    const closeEditDialog = () => {
        setOpen(false);
        setEditData({ title: "", body: "", id: null });
    };

    return (
        <Stack display="flex" direction="row">
            <form onSubmit={handleSubmit} style={{ marginRight: '20px' }}>
                <Stack spacing={2}>
                    <TextField
                        id="title"
                        name="title"
                        label="Title"
                        variant="outlined"
                        value={formData.title}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        id="body"
                        name="body"
                        label="Body"
                        variant="outlined"
                        value={formData.body}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Button type="submit" variant="contained" color="primary">
                        <AddIcon />
                    </Button>
                </Stack>
            </form>
            <Stack direction='row-reverse' flexWrap='wrap' gap={1} width="80%">
                {item?.map((res) =>
                    <Card sx={{ maxWidth: 345, marginBottom: 10, display: "flex", flexDirection: "column", justifyContent: "space-between" }} key={res?.id}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {res?.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {res?.body}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions sx={{ display: "flex", flexDirection: "row", justifyContent: "end" }}>
                            <Button variant="outlined" color="success" onClick={() => openEditDialog(res)}>
                                <EditIcon />
                            </Button>
                            <Button variant="outlined" color="error" onClick={() => deletePost(res?.id)}>
                                <DeleteIcon />
                            </Button>
                        </CardActions>
                    </Card>
                )}
            </Stack>

            <Dialog open={open} onClose={closeEditDialog}>
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
                        value={editData.title}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        id="body"
                        name="body"
                        label="Body"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={editData.body}
                        onChange={handleEditChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeEditDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
};

export default TodoApp;
