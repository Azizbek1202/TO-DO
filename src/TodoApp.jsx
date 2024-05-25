import React, { useEffect, useState } from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import TodoService from './todoService';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import EditDialog from './EditDialog';

const TodoApp = () => {
  const [items, setItems] = useState([]);
  const [editData, setEditData] = useState({ title: '', body: '', id: null });
  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const initialItems = await TodoService.getAllPosts();
      setItems(initialItems);
    }
    fetchData();
  }, []);

  const handleSubmit = async formData => {
    try {
      const response = await TodoService.createPost(formData);
      setItems([response, ...items]);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleEdit = post => {
    setEditData(post);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditData({ title: '', body: '', id: null });
  };

  const handleChangeEditData = e => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      const response = await TodoService.updatePost(editData.id, editData);
      const updatedItems = items.map(post => (post.id === editData.id ? response : post));
      setItems(updatedItems);
      handleCloseEditDialog();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDelete = async id => {
    try {
      await TodoService.deletePost(id);
      const updatedItems = items.filter(post => post.id !== id);
      setItems(updatedItems);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">Todo App</Typography>
        </Toolbar>
      </AppBar>

      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" p={2} mt={8}>
        <TodoForm onSubmit={handleSubmit} />
        <TodoList items={items} onEdit={handleEdit} onDelete={handleDelete} />
        <EditDialog
          open={openEditDialog}
          onClose={handleCloseEditDialog}
          post={editData}
          onSubmit={handleEditSubmit}
          onChange={handleChangeEditData}
        />
      </Box>
    </Box>
  );
};

export default TodoApp;
