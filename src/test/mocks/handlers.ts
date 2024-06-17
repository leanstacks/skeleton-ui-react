import { HttpResponse, http } from 'msw';
import filter from 'lodash/filter';
import find from 'lodash/find';

import { usersFixture } from '__fixtures__/users';
import { todosFixture } from '__fixtures__/todos';

export const handlers = [
  http.get('https://jsonplaceholder.typicode.com/users', () => {
    // get all users
    return HttpResponse.json(usersFixture);
  }),
  http.get('https://jsonplaceholder.typicode.com/users/:userId', ({ params }) => {
    // get a user by identifier
    const { userId } = params;
    const user = find(usersFixture, { id: Number(userId) });
    if (user) {
      return HttpResponse.json(user);
    }
    return new HttpResponse(null, { status: 404 });
  }),
  http.get('https://jsonplaceholder.typicode.com/users/:userId/todos', ({ params }) => {
    // get all tasks(todos) for a user
    const { userId } = params;
    const todos = filter(todosFixture, { userId: Number(userId) });
    return HttpResponse.json(todos);
  }),
  http.put('https://jsonplaceholder.typicode.com/todos/:todoId', async ({ params, request }) => {
    // update a task
    const { todoId } = params;
    const todo = find(todosFixture, { id: Number(todoId) });
    if (todo) {
      // return the request body as the response
      const requestBody = await request.json();
      return HttpResponse.json(requestBody);
    }
    return new HttpResponse(null, { status: 404 });
  }),
];
