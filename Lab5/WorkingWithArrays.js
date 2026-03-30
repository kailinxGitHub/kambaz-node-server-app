let nextTodoId = 4;

let todos = [
  {
    id: 1,
    title: 'Learn Express',
    description: 'Create route handlers with Express',
    completed: true,
  },
  {
    id: 2,
    title: 'Practice REST APIs',
    description: 'Use path, query, and body data',
    completed: false,
  },
  {
    id: 3,
    title: 'Build Lab 5 UI',
    description: 'Connect the Next.js client to the server',
    completed: false,
  },
];

const normalizeBoolean = (value) => value === true || value === 'true';

const findTodoIndex = (id) => todos.findIndex((todo) => todo.id === Number(id));

const getTodos = (req, res) => {
  if (req.query.completed) {
    const completed = normalizeBoolean(req.query.completed);
    res.json(todos.filter((todo) => todo.completed === completed));
    return;
  }
  res.json(todos);
};

const getTodoById = (req, res) => {
  const todo = todos.find((item) => item.id === Number(req.params.id));
  if (!todo) {
    res.status(404).json({ message: `Unable to find todo with id ${req.params.id}` });
    return;
  }
  res.json(todo);
};

const createNewTodo = (req, res) => {
  const newTodo = {
    id: nextTodoId,
    title: `New Todo ${nextTodoId}`,
    description: `Todo ${nextTodoId} description`,
    completed: false,
  };
  nextTodoId += 1;
  todos.push(newTodo);
  res.json(todos);
};

const deleteTodoByGet = (req, res) => {
  todos = todos.filter((todo) => todo.id !== Number(req.params.id));
  res.json(todos);
};

const updateTodoTitleByGet = (req, res) => {
  const todoIndex = findTodoIndex(req.params.id);
  if (todoIndex === -1) {
    res.status(404).json({ message: `Unable to find todo with id ${req.params.id}` });
    return;
  }
  todos[todoIndex] = { ...todos[todoIndex], title: req.params.title };
  res.json(todos);
};

const updateTodoCompletedByGet = (req, res) => {
  const todoIndex = findTodoIndex(req.params.id);
  if (todoIndex === -1) {
    res.status(404).json({ message: `Unable to find todo with id ${req.params.id}` });
    return;
  }
  todos[todoIndex] = {
    ...todos[todoIndex],
    completed: normalizeBoolean(req.params.completed),
  };
  res.json(todos);
};

const updateTodoDescriptionByGet = (req, res) => {
  const todoIndex = findTodoIndex(req.params.id);
  if (todoIndex === -1) {
    res.status(404).json({ message: `Unable to find todo with id ${req.params.id}` });
    return;
  }
  todos[todoIndex] = {
    ...todos[todoIndex],
    description: req.params.description,
  };
  res.json(todos);
};

const postNewTodo = (req, res) => {
  const newTodo = {
    id: nextTodoId,
    title: req.body.title || `New Todo ${nextTodoId}`,
    description: req.body.description || '',
    completed: normalizeBoolean(req.body.completed),
  };
  nextTodoId += 1;
  todos.push(newTodo);
  res.json(newTodo);
};

const deleteTodo = (req, res) => {
  const todoIndex = findTodoIndex(req.params.id);
  if (todoIndex === -1) {
    res.status(404).json({ message: `Unable to find todo with id ${req.params.id}` });
    return;
  }
  todos.splice(todoIndex, 1);
  res.sendStatus(200);
};

const updateTodo = (req, res) => {
  const todoIndex = findTodoIndex(req.params.id);
  if (todoIndex === -1) {
    res.status(404).json({ message: `Unable to find todo with id ${req.params.id}` });
    return;
  }
  todos[todoIndex] = {
    ...todos[todoIndex],
    ...req.body,
    id: todos[todoIndex].id,
    completed:
      req.body.completed === undefined
        ? todos[todoIndex].completed
        : normalizeBoolean(req.body.completed),
  };
  res.sendStatus(200);
};

export default function WorkingWithArrays(app) {
  app.get('/lab5/todos/create', createNewTodo);
  app.get('/lab5/todos/:id/delete', deleteTodoByGet);
  app.get('/lab5/todos/:id/title/:title', updateTodoTitleByGet);
  app.get('/lab5/todos/:id/completed/:completed', updateTodoCompletedByGet);
  app.get('/lab5/todos/:id/description/:description', updateTodoDescriptionByGet);
  app.get('/lab5/todos/:id', getTodoById);
  app.get('/lab5/todos', getTodos);
  app.post('/lab5/todos', postNewTodo);
  app.delete('/lab5/todos/:id', deleteTodo);
  app.put('/lab5/todos/:id', updateTodo);
}
