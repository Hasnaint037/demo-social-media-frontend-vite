import { Button } from "@/components/ui/button";
import { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    const { hasError } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      if (fallback) return fallback;
      return (
        <div
          className="flex flex-col items-center justify-center h-screen text-center px-6
            bg-linear-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-md w-full border border-blue-100 dark:border-gray-700">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-blue-500 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 100 20 10 10 0 000-20z"
                  />
                </svg>
              </div>

              <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                We encountered an unexpected error. Please try refreshing the
                page.
              </p>

              <Button
                onClick={this.handleReload}
                variant="blue"
                className="mt-4 w-full"
              >
                Refresh Page
              </Button>
            </div>
          </div>

          <p className="mt-8 text-sm text-gray-400 dark:text-gray-500">
            If the issue persists, contact support.
          </p>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
