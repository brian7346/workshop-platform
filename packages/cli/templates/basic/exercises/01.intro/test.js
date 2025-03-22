const greet = require('./problem');

test('greet function returns correct greeting with name', () => {
  expect(greet('Alice')).toBe('Hello, Alice!');
  expect(greet('Bob')).toBe('Hello, Bob!');
  expect(greet('Workshop Participant')).toBe('Hello, Workshop Participant!');
}); 