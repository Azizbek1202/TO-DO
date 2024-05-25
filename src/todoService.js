import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';
const LOCAL_STORAGE_KEY = 'todos';

const TodoService = {
  async getAllPosts() {
    try {
      const response = await axios.get(BASE_URL);
      const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
      const mergedTodos = [...storedTodos, ...response.data];
      return mergedTodos;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  },

  async createPost(newPost) {
    try {
      const response = await axios.post(BASE_URL, newPost);
      const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
      const updatedTodos = [response.data, ...storedTodos];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  async updatePost(id, updatedPost) {
    try {
      const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
      const updatedTodos = storedTodos.map(todo => (todo.id === id ? updatedPost : todo));
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
      return updatedPost;
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  },

  async deletePost(id) {
    try {
      const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
      const updatedTodos = storedTodos.filter(todo => todo.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }
};

export default TodoService;
