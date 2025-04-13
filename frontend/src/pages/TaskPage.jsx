import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getTasks, createTask, completeTask, deleteTask } from '../services/api';

const TaskPage = () => {
  const { userId, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [addingTask, setAddingTask] = useState(false);
  const [completingTaskId, setCompletingTaskId] = useState(null);
  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return navigate('/');
    fetchTasks();
  }, [userId]);

  const fetchTasks = async () => {
    setLoadingTasks(true);
    const res = await getTasks(userId);
    setTasks(res.data);
    setLoadingTasks(false);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setAddingTask(true);
    await createTask(userId, title);
    setTitle('');
    await fetchTasks();
    setAddingTask(false);
  };

  const handleComplete = async (id) => {
    setCompletingTaskId(id);
    await completeTask(id);
    await fetchTasks();
    setCompletingTaskId(null);
  };

  const handleDelete = async (id) => {
    setDeletingTaskId(id);
    await deleteTask(id);
    await fetchTasks();
    setDeletingTaskId(null);
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <button onClick={logout} className="text-sm text-red-500">Logout</button>
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="flex mb-6">
        <input
          className="flex-1 border p-2"
          placeholder="Enter new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className={`bg-green-500 text-white px-4 ml-2 flex items-center justify-center ${addingTask ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={addingTask}
        >
          {addingTask ? (
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
          ) : 'Add'}
        </button>
      </form>

      {/* Loading State for Task List */}
      {loadingTasks ? (
        <div className="text-center mt-6">
          <span className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full inline-block"></span>
          <p className="mt-2 text-gray-500">Loading tasks...</p>
        </div>
      ) : (
        <ul>
          {tasks.map(task => (
            <li
              key={task.id}
              className="flex justify-between items-center border-b py-2"
            >
              <span className={task.completed ? 'line-through text-gray-500' : ''}>
                {task.title}
              </span>
              <div className="space-x-2 flex items-center">
                {!task.completed && (
                  <button
                    onClick={() => handleComplete(task.id)}
                    className="text-blue-500"
                    disabled={completingTaskId === task.id}
                  >
                    {completingTaskId === task.id ? (
                      <span className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full inline-block"></span>
                    ) : 'Complete'}
                  </button>
                )}
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500"
                  disabled={deletingTaskId === task.id}
                >
                  {deletingTaskId === task.id ? (
                    <span className="animate-spin h-4 w-4 border-2 border-red-500 border-t-transparent rounded-full inline-block"></span>
                  ) : 'Delete'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskPage;

