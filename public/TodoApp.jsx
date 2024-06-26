import { AppBar, Box, Button, Card, CardActionArea, CardActions, CardContent, Grid, TextField, Toolbar, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PostAddIcon from '@mui/icons-material/PostAdd';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const TodoApp = () => {
    const [item, setItem] = useState([]);
    const [editData, setEditData] = useState({ title: "", body: "", id: null });
    const [open, setOpen] = useState(false);

    const saveToLocalStorage = (data) => {
        localStorage.setItem('todoItems', JSON.stringify(data));
    };

    const getFromLocalStorage = () => {
        const savedItems = localStorage.getItem('todoItems');
        return savedItems ? JSON.parse(savedItems) : [];
    };

    const getItem = async () => {
        try {
            const localItems = getFromLocalStorage();
            setItem(localItems);

            const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
            const initialItems = response?.data;
            setItem([...localItems, ...initialItems]);
        } catch (error) {
            console.log("Error fetching items:", error);
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

        if (!formData.title.trim() || !formData.body.trim()) {
            alert("Ma'lumot to'liq emas");
            return;
        }
        const newId = item.length ? Math.max(...item.map(post => post.id)) + 1 : 1;

        const newPost = {
            ...formData,
            id: newId
        };

        try {
            const response = await axios.post("https://jsonplaceholder.typicode.com/posts", newPost);
            const updatedItems = [response.data, ...item];
            setItem(updatedItems);
            saveToLocalStorage(updatedItems);
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
            let updatedItems;
            if (editData.id <= 100) {
                const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${editData.id}`, {
                    title: editData.title,
                    body: editData.body
                });
                updatedItems = item.map((post) => (post.id === editData.id ? response.data : post));
            } else {
    
                updatedItems = item.map((post) => (post.id === editData.id ? editData : post));
            }
            setItem(updatedItems);
            saveToLocalStorage(updatedItems);
            setOpen(false);
            setEditData({ title: "", body: "", id: null });
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    const deletePost = async (id) => {
        try {
            if (id <= 100) {
                await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
            }
            const updatedItems = item.filter((post) => post.id !== id);
            setItem(updatedItems);
            saveToLocalStorage(updatedItems);
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
        <Box>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6">
                        Todo App
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" p={2} mt={8}>
                <Grid container spacing={2} justifyContent="center" direction="column" alignItems="center" sx={{ width: '100%', maxWidth: '600px' }}>
                    <Grid item xs={12} >
                        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="title"
                                        name="title"
                                        label="Title"
                                        variant="outlined"
                                        value={formData.title}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="body"
                                        name="body"
                                        label="Body"
                                        variant="outlined"
                                        value={formData.body}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="outlined" color="primary" fullWidth>
                                        <PostAddIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>

                <Grid container spacing={2} justifyContent="center" sx={{ mt: 2, maxWidth: 1000 }}>
                    {item?.map((res) =>
                        <Grid item xs={12} sm={6} lg={4} key={res?.id}>
                            <Card sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
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
                                <CardActions sx={{ display: "flex", justifyContent: "end" }}>
                                    <Button variant="contained" color="success" onClick={() => openEditDialog(res)}>
                                        <BorderColorIcon />
                                    </Button>
                                    <Button variant="outlined" color="error" onClick={() => deletePost(res?.id)}>
                                        <DeleteForeverIcon />
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )}
                </Grid>

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
            </Box>
        </Box>
    );
};

export default TodoApp;