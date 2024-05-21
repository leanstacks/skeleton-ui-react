import { afterAll, afterEach, beforeAll } from 'vitest';

import { server } from './src/test/mocks/server';
import { queryClient } from './src/test/test-utils';

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
