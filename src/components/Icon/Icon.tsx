import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';

/**
 * Properties for the `Icon` component.
 * @param {string} name - The Google Material Symbols icon name.
 * @param {number} [fill] - Indicates if icon is filled. Values: `1` Filled, `0` - Outline. Default: `1`.
 * @param {number} [weight] - The icon weight. Values: `100`, `200`, `300`, `400`, `500`, `600`, `700`. Default: `400`.
 * @param {number} [grade] - Granular adjustments to the thickness. Range: `-25`-`200`. Default: `0`.
 * @param {number} [opticalSize] - Optical size. Range: `20`-`48`. Default: `24`.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
export interface IconProps extends PropsWithClassName, PropsWithTestId {
  name: string;
  fill?: 0 | 1;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
  grade?: number;
  opticalSize?: number;
}

const FILL_VALUES = [0, 1];
const FILL_DEFAULT = 1;
const WEIGHT_VALUES = [100, 200, 300, 400, 500, 600, 700];
const WEIGHT_DEFAULT = 400;
const GRADE_MIN = -25;
const GRADE_MAX = 200;
const GRADE_DEFAULT = 0;
const OPTICAL_SIZE_MIN = 20;
const OPTICAL_SIZE_MAX = 48;
const OPTICAL_SIZE_DEFAULT = 24;

/**
 * The `Icon` React component formats and renders a styled icon from Google Material Symbols.
 * @param {IconProps} props - Component properties, `IconProps`.
 * @returns {JSX.Element} JSX
 * @see {@link https://fonts.google.com/icons | Google Material Symbols}
 * @see {@link IconProps}
 */
const Icon = ({
  className,
  fill = FILL_DEFAULT,
  grade = 0,
  name,
  opticalSize = 24,
  testId = 'icon',
  weight = 400,
}: IconProps): JSX.Element => {
  const fillValue = FILL_VALUES.includes(fill) ? fill : FILL_DEFAULT;
  const weightValue = WEIGHT_VALUES.includes(weight) ? weight : WEIGHT_DEFAULT;
  const gradeValue = grade < GRADE_MIN || grade > GRADE_MAX ? GRADE_DEFAULT : grade;
  const opticalSizeValue =
    opticalSize < OPTICAL_SIZE_MIN || opticalSize > OPTICAL_SIZE_MAX
      ? OPTICAL_SIZE_DEFAULT
      : opticalSize;

  const iconStyle = {
    fontVariationSettings: `'FILL' ${fillValue}, 'wght' ${weightValue}, 'GRAD' ${gradeValue}, 'opsz' ${opticalSizeValue}`,
  };

  return (
    <span
      className={classNames('material-symbols-rounded leading-none', className)}
      style={iconStyle}
      data-testid={testId}
    >
      {name}
    </span>
  );
};

export default Icon;
