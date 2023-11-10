import TasksService from './tasksService';
import express from 'express';
import cors from 'cors';
import * as path from 'path';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

if (process.env.NONE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
} else {
  const corsOptions = {
    origin: ['*'],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

const taskService = new TasksService();

// Route to get all posts
app.get('/api/get', async (req, res) => {
  res.send({ tasks: await taskService.getAllTasks() });
});

app.post('/api/post', async (req, res) => {
  const name = req.body.name;
  const isCompleted = false;
  res.send({ tasks: await taskService.createTask(name, isCompleted) });
});

app.delete(`/api/delete/:id`, async (req, res) => {
  console.log(req.params.id);
  const id = parseInt(req.params.id as string);
  res.send({ tasks: await taskService.deleteTask(id) });
});

app.put(`/api/put/:id`, async (req, res) => {
  const data = [req.body.name, req.body.isCompleted, req.params.id];
  console.log(data);
  res.send({ tasks: await taskService.updateTask(data) });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
