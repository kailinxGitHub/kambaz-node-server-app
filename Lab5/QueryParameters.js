export default function QueryParameters(app) {
  app.get('/lab5/calculator', (req, res) => {
    const operation = req.query.operation;
    const a = Number(req.query.a);
    const b = Number(req.query.b);

    switch (operation) {
      case 'add':
        res.send(`${a + b}`);
        return;
      case 'subtract':
        res.send(`${a - b}`);
        return;
      case 'multiply':
        res.send(`${a * b}`);
        return;
      case 'divide':
        res.send(`${a / b}`);
        return;
      default:
        res.status(400).send('Unknown operation');
    }
  });
}
