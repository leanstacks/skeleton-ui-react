/**
 * The `ErrorFallback` component renders the content displayed when the `ErrorBoundary`
 * catches an Error thrown from another React component.
 * @returns {JSX.Element} JSX
 * @see {@link ErrorBoundary}
 */
const ErrorFallback = (): JSX.Element => {
  return (
    <div data-testid="error-fallback" className="px-8">
      <div className="container mx-auto min-h-[50vh]">
        <h1 className="mb-4 pt-32 text-4xl md:mb-8 md:text-8xl">Whoops!</h1>

        <div className="mb-4 opacity-60 md:text-2xl">
          Something is not quite right. Let's{' '}
          <a href="/" title="Try again" className="text-blue-500 hover:underline">
            try again
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
