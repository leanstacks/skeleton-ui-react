import React, { PropsWithChildren, ReactNode } from 'react';

/**
 * Properties for the `ErrorBoundary` component.
 * @see {@link PropsWithChildren}
 */
interface ErrorBoundaryProps extends PropsWithChildren {
  fallback: ReactNode;
}

/**
 * State for the `ErrorBoundary` component.
 */
interface ErrorBoundaryState {
  error?: Error | string;
  hasError: boolean;
}

/**
 * The `ErrorBoundary` component is rendered when an uncaught error is thrown
 * from a child component.
 * @see {@link ErrorBoundaryProps}
 * @see {@link ErrorBoundaryState}
 * @see {@link https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary | Catching rendering errors with an error boundary}
 */
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown) {
    return { error, hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
