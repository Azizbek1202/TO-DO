import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';

const TodoForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ title: "", body: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    if (!formData.title.trim() || !formData.body.trim()) {
      return alert("Kamida bitta maydon to'ldirilmagan"); 
    }
    
    onSubmit(formData);
    setFormData({ title: "", body: "" });
  };

  return (
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
  );
};

export default TodoForm;
