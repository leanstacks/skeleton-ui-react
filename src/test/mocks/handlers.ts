import { rest } from 'msw';
import filter from 'lodash/filter';
import find from 'lodash/find';

import { usersFixture } from '__fixtures__/users';
import { todosFixture } from '__fixtures__/todos';

export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/users', (_req, res, ctx) => {
    return res(ctx.json(usersFixture));
  }),
  rest.get('https://jsonplaceholder.typicode.com/users/:userId', (req, res, ctx) => {
    const { userId } = req.params;
    const user = find(usersFixture, { id: Number(userId) });
    if (user) {
      return res(ctx.json(user));
    }
    return res(ctx.status(404));
  }),
  rest.get('https://jsonplaceholder.typicode.com/users/:userId/todos', (req, res, ctx) => {
    const { userId } = req.params;
    const todos = filter(todosFixture, { userId: Number(userId) });
    return res(ctx.json(todos));
  }),
];
