import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import Link from 'components/Link/Link';

/**
 * Properties for the `Footer` component.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface FooterProps extends PropsWithClassName, PropsWithTestId {}

/**
 * The `Footer` React component renders the standard page footer content used
 * throughout the application.
 * @param {FooterProps} props - Component properties, `FooterProps`.
 * @returns {JSX.Element} JSX
 * @see {@link FooterProps}
 */
const Footer = ({ className, testId = 'footer' }: FooterProps): JSX.Element => {
  const { t } = useTranslation();
  const year = dayjs().format('YYYY');

  return (
    <footer className={classNames('px-4 pb-8 pt-16', className)} data-testid={testId}>
      <div className="flex flex-wrap items-center justify-center text-xs">
        <div className="mx-2">&copy; {year} LeanStacks</div>
        <div className="mx-2">
          <Link
            to="https://leanstacks.net/privacy.html"
            title={t('privacyPolicy', { ns: 'common' })}
            target="_blank"
            className="text-inherit"
          >
            {t('privacy', { ns: 'common' })}
          </Link>
        </div>
        <div className="mx-2">
          <Link
            to="https://leanstacks.net/terms.html"
            title={t('termsAndConditions', { ns: 'common' })}
            target="_blank"
            className="text-inherit"
          >
            {t('terms', { ns: 'common' })}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
