import {
  getTechnologiesByType,
  getTechnology
} from '../../selectors/technologies';

import technologies from '../fixtures/technologies';

test('should return all build technologies', () => {
  const buildTechnologies = getTechnologiesByType(technologies, 'build');

  expect(buildTechnologies).toHaveLength(5);
});

test('should return empty array when no technologies', () => {
  const emptyTechnologies = getTechnologiesByType([], 'build');

  expect(emptyTechnologies).toEqual([]);
});

test('should return the requested technology', () => {
  const technology = getTechnology(technologies, 'adbe711c-9698-41f7-bf86-ae3e41ba49eb');

  expect(technology).toEqual({
    id: "adbe711c-9698-41f7-bf86-ae3e41ba49eb",
    name: "React",
    type: "application",
    version: "16.2.0",
    license: "MIT",
    licenseUrl: "https://spdx.org/licenses/MIT.html",
    description: "React is a structural framework for dynamic web apps.",
    url: "https://reactjs.org/"
  });
});

test('should return undefined when not found', () => {
  const technology = getTechnology(technologies, '2a811f1f-fb16-46e1-81eb-7d01a089f695');

  expect(technology).toBeUndefined();
});