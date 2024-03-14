import { rest } from 'msw';

import { userFixture, usersFixture } from '__fixtures__/users';

export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
    return res(ctx.json(usersFixture));
  }),
  rest.get('https://jsonplaceholder.typicode.com/users/:id', (req, res, ctx) => {
    return res(ctx.json(userFixture));
  }),
];
