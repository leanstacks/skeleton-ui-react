import { rest } from 'msw';

import { userFixture } from '__fixtures__/users';

export const handlers = [
  rest.get('/api/ping', async (req, res, ctx) => {
    // simple API for testing foundational components
    return res(ctx.json({ ping: 'pong' }));
  }),
  rest.get('/api/errors/:httpStatusCode', async (req, res, ctx) => {
    // simulate API response errors
    const { httpStatusCode } = req.params;
    return res(ctx.status(Number(httpStatusCode)));
  }),
  rest.get('/api/users', (req, res, ctx) => {
    const externalId = req.url.searchParams.get('externalId');
    if (externalId) {
      if (externalId === 'not-found') {
        return res(ctx.json([]));
      }
      return res(ctx.json(userFixture));
    }
  }),
  rest.put('/users/:id', (req, res, ctx) => {
    return res(ctx.json(userFixture));
  }),
];
