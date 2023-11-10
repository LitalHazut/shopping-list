import dbConnection from './dbConnection';

class TasksService {
  getAllTasks() {
    return new Promise((resolve, reject) =>
      dbConnection.query('SELECT * FROM tasks', (err, result) => {
        if (err) reject(err);
        else resolve(result);
      })
    );
  }

  createTask(name: string, isCompleted: boolean) {
    const sql = `INSERT INTO tasks(name,isCompleted) VALUES (?, ?)`;
    const values = [name, isCompleted];
    return new Promise((resolve, reject) =>
      dbConnection.query(sql, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      })
    );
  }

  deleteTask(id: number) {
    const sql = `DELETE FROM tasks WHERE id = ?`;
    return new Promise((resolve, reject) =>
      dbConnection.query(sql, id, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      })
    );
  }

  updateTask(data: Array<string>) {
    const sql = `UPDATE tasks SET name = ?, isCompleted = ?  WHERE id = ?`;
    return new Promise((resolve, reject) =>
      dbConnection.query(sql, data, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      })
    );
  }
}
export default TasksService;
