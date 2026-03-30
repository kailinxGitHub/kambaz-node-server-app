let assignment = {
  id: 1,
  title: 'Node JS Assignment',
  description: 'Create a REST API with Express',
  score: 100,
  completed: false,
};

let module = {
  id: 1,
  name: 'Lab 5',
  description: 'Working with REST APIs',
};

export default function WorkingWithObjects(app) {
  app.get('/lab5/assignment', (req, res) => {
    res.json(assignment);
  });

  app.get('/lab5/assignment/title', (req, res) => {
    res.send(assignment.title);
  });

  app.get('/lab5/assignment/title/:newTitle', (req, res) => {
    assignment = { ...assignment, title: req.params.newTitle };
    res.json(assignment);
  });

  app.get('/lab5/assignment/score', (req, res) => {
    res.send(`${assignment.score}`);
  });

  app.get('/lab5/assignment/score/:newScore', (req, res) => {
    assignment = { ...assignment, score: Number(req.params.newScore) };
    res.json(assignment);
  });

  app.get('/lab5/assignment/completed', (req, res) => {
    res.send(`${assignment.completed}`);
  });

  app.get('/lab5/assignment/completed/:completed', (req, res) => {
    assignment = {
      ...assignment,
      completed: req.params.completed === 'true',
    };
    res.json(assignment);
  });

  app.get('/lab5/module', (req, res) => {
    res.json(module);
  });

  app.get('/lab5/module/name', (req, res) => {
    res.send(module.name);
  });

  app.get('/lab5/module/name/:newName', (req, res) => {
    module = { ...module, name: req.params.newName };
    res.json(module);
  });

  app.get('/lab5/module/description', (req, res) => {
    res.send(module.description);
  });

  app.get('/lab5/module/description/:newDescription', (req, res) => {
    module = { ...module, description: req.params.newDescription };
    res.json(module);
  });
}
