export default function PathParameters(app) {
  const calculate = (a, b, operation) => {
    switch (operation) {
      case 'add':
        return a + b;
      case 'subtract':
        return a - b;
      case 'multiply':
        return a * b;
      case 'divide':
        return a / b;
      default:
        return null;
    }
  };

  const respondWithOperation = (operation) => (req, res) => {
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    const result = calculate(a, b, operation);
    res.send(`${result}`);
  };

  app.get('/lab5/add/:a/:b', respondWithOperation('add'));
  app.get('/lab5/subtract/:a/:b', respondWithOperation('subtract'));
  app.get('/lab5/multiply/:a/:b', respondWithOperation('multiply'));
  app.get('/lab5/divide/:a/:b', respondWithOperation('divide'));
}
