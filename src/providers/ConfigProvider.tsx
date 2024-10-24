import React, { PropsWithChildren, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { ObjectSchema } from 'yup';

/**
 * The application configuration. The `value` provided by the `ConfigContext`.
 */
export interface Config {
  VITE_BASE_URL_API: string;
  VITE_BUILD_DATE: string;
  VITE_BUILD_TIME: string;
  VITE_BUILD_TS: string;
  VITE_BUILD_COMMIT_SHA: string;
  VITE_BUILD_ENV_CODE: string;
  VITE_BUILD_WORKFLOW_NAME: string;
  VITE_BUILD_WORKFLOW_RUN_NUMBER: number;
  VITE_BUILD_WORKFLOW_RUN_ATTEMPT: number;
  VITE_TOAST_AUTO_DISMISS_MILLIS: number;
}

/**
 * The configuration validation schema.
 * @see {@link https://github.com/jquense/yup | Yup}
 */
const configSchema: ObjectSchema<Config> = Yup.object({
  VITE_BASE_URL_API: Yup.string().url().required(),
  VITE_BUILD_DATE: Yup.string().default('1970-01-01'),
  VITE_BUILD_TIME: Yup.string().default('00:00:00'),
  VITE_BUILD_TS: Yup.string().default('1970-01-01T00:00:00+0000'),
  VITE_BUILD_COMMIT_SHA: Yup.string().default('local'),
  VITE_BUILD_ENV_CODE: Yup.string().default('local'),
  VITE_BUILD_WORKFLOW_NAME: Yup.string().default('local'),
  VITE_BUILD_WORKFLOW_RUN_NUMBER: Yup.number().default(1),
  VITE_BUILD_WORKFLOW_RUN_ATTEMPT: Yup.number().default(1),
  VITE_TOAST_AUTO_DISMISS_MILLIS: Yup.number().default(5000),
});

/**
 * The `ConfigContext` instance.
 */
export const ConfigContext = React.createContext<Config | undefined>(undefined);

/**
 * The `ConfigContextProvider` React component creates, maintains, and provides
 * access to the `ConfigContext` value.
 * Validates the React application configuration values from `import.meta.env`.
 * Throws an `Error` when the configuration is invalid, preventing application
 * startup.
 * @param {PropsWithChildren} props - Component properties, `PropsWithChildren`.
 * @returns {JSX.Element} JSX
 */
const ConfigContextProvider = ({ children }: PropsWithChildren) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [config, setConfig] = useState<Config>();

  useEffect(() => {
    try {
      const validatedConfig = configSchema.validateSync(import.meta.env, {
        abortEarly: false,
        stripUnknown: true,
      });
      setConfig(validatedConfig);
      setIsReady(true);
    } catch (err) {
      if (err instanceof Yup.ValidationError) throw new Error(`${err}::${err.errors}`);
      if (err instanceof Error) throw new Error(`Configuration error: ${err.message}`);
      throw err;
    }
  }, []);

  return (
    <ConfigContext.Provider value={config}>{isReady && <>{children}</>}</ConfigContext.Provider>
  );
};

export default ConfigContextProvider;
