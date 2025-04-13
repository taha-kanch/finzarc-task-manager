import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const loginUser = (email, password) =>
  API.post('/auth/login', { email, password });

export const getTasks = (userId) =>
  API.get(`/tasks/${userId}`);

export const createTask = (userId, title) =>
  API.post('/tasks', { userId, title });

export const completeTask = (taskId) =>
  API.put(`/tasks/${taskId}/complete`);

export const deleteTask = (taskId) =>
  API.delete(`/tasks/${taskId}`);

