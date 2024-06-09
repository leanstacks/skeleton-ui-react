import isNaN from 'lodash/isNaN';
import toNumber from 'lodash/toNumber';

/**
 * Converts the supplied `value` to a `number`.
 *
 * If type conversion
 * fails, returns the supplied default value, `defaultValue`.
 *
 * If value exceeds the `minimum` or `maxaximum`, returns the supplied default
 * value.
 * @param value - The value to be converted.
 * @param minimum - The minimum allowed value.
 * @param maximum - The maximum allowed value.
 * @param defaultValue - The default value.
 * @returns {number} The resulting `number` value after type conversion and
 * validation.
 */
export const toNumberBetween = (
  value: boolean | number | string | null,
  minimum: number,
  maximum: number,
  defaultValue: number,
): number => {
  // convert value to a number
  const numVal = toNumber(value);
  // if result is not a number (NaN), return default
  if (isNaN(numVal)) {
    return defaultValue;
  }
  // if result is outside the boundaries, return default
  if (numVal < minimum || numVal > maximum) {
    return defaultValue;
  }
  // otherwise return result
  return numVal;
};
