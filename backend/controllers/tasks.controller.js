const { v4 } = require('uuid');
const { readJSON, writeJSON } = require('../utils/fileHelpers');

const TASKS_FILE = './data/tasks.json';

const getTaskByUser = (req, res) => {

const { userId } = req.params;
const tasks = readJSON(TASKS_FILE).filter(t => t.userId === userId);
return res.json(tasks);

};

const createTask = (req, res) => {

const { userId, title } = req.body;

if(!userId || !title) return res.status(400).json({ message: "userId and title are required" });

const tasks = readJSON(TASKS_FILE);
const newTask = {
id: v4(),
userId,
title,
completed: false,
createdAt: new Date().toISOString(),
};

tasks.push(newTask);
writeJSON(TASKS_FILE, tasks);

return res.status(201).json(newTask);

};

const completeTask = (req, res) => {

const { taskId } = req.params;
const tasks = readJSON(TASKS_FILE);
const task = tasks.find(t => t.id === taskId);

if(!task) return res.status(404).json({ message: "Task not found" });

task.completed = true;
task.completedAt = new Date().toISOString();
writeJSON(TASKS_FILE, tasks);

return res.json(task);

};

const deleteTask = (req, res) => {

const { taskId } = req.params;
let tasks = readJSON(TASKS_FILE);
const initialLength = tasks.length;

tasks = tasks.filter(t => t.id !== taskId);

if(tasks.length === initialLength) {
return res.status(404).json({ message: "Task not found" });
}

writeJSON(TASKS_FILE, tasks);
return res.json({ message: 'Task deleted successfully' });

};

module.exports = { getTaskByUser, createTask, completeTask, deleteTask };
