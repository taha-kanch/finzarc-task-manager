import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getTasks, createTask, completeTask, deleteTask } from '../services/api';

const TaskPage = () => {
  const { userId, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return navigate('/');
    fetchTasks();
  }, [userId]);

  const fetchTasks = async () => {
    const res = await getTasks(userId);
    setTasks(res.data);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await createTask(userId, title);
    setTitle('');
    fetchTasks();
  };

  const handleComplete = async (id) => {
    await completeTask(id);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <button onClick={logout} className="text-sm text-red-500">Logout</button>
      </div>
      <form onSubmit={handleAddTask} className="flex mb-6">
        <input
          className="flex-1 border p-2"
          placeholder="Enter new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="bg-green-500 text-white px-4 ml-2">Add</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li
            key={task.id}
            className="flex justify-between items-center border-b py-2"
          >
            <span className={task.completed ? 'line-through text-gray-500' : ''}>
              {task.title}
            </span>
            <div className="space-x-2">
              {!task.completed && (
                <button
                  onClick={() => handleComplete(task.id)}
                  className="text-blue-500"
                >
                  Complete
                </button>
              )}
              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskPage;

