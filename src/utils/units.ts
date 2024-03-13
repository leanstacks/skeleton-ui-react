import { UNITS_IMPERIAL, UNITS_METRIC } from './constants';

/**
 * Returns a `boolean` indicating if the `units` value is `metric`.
 * @param units - The unit of measurement.
 * @returns A boolean indicating if the `units` value is `metric`.
 */
export const isUnitsMetric = (units: string) => units === UNITS_METRIC;

/**
 * Returns a `boolean` indicating if the `units` value is `imperial`.
 * @param units - The unit of measurement.
 * @returns A boolean indicating if the `units` value is `imperial`.
 */
export const isUnitsImperial = (units: string) => units === UNITS_IMPERIAL;
