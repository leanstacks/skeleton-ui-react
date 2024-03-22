/**
 * A `ComponentProperty` object contains metadata describing a single attribute
 * in a React component's properties object.
 * @param {string} name - The property, i.e. attribute, name.
 * @param {string} description - A short description of the property.
 */
export type ComponentProperty = {
  name: string;
  description: string;
}