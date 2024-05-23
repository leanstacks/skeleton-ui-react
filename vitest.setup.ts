import { afterAll, afterEach, beforeAll } from 'vitest';

import { server } from './src/test/mocks/server';
import { queryClient } from './src/test/query-client';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  queryClient.clear();
});

afterAll(() => {
  server.close();
});
