import { HttpResponse, http } from 'msw';
import filter from 'lodash/filter';
import find from 'lodash/find';

import { usersFixture } from '__fixtures__/users';
import { todosFixture } from '__fixtures__/todos';

export const handlers = [
  http.get('https://jsonplaceholder.typicode.com/users', () => {
    return HttpResponse.json(usersFixture);
  }),
  http.get('https://jsonplaceholder.typicode.com/users/:userId', ({ params }) => {
    const { userId } = params;
    const user = find(usersFixture, { id: Number(userId) });
    if (user) {
      return HttpResponse.json(user);
    }
    return new HttpResponse(null, { status: 404 });
  }),
  http.get('https://jsonplaceholder.typicode.com/users/:userId/todos', ({ params }) => {
    const { userId } = params;
    const todos = filter(todosFixture, { userId: Number(userId) });
    return HttpResponse.json(todos);
  }),
];
