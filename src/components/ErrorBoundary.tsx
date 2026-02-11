import { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  fallback?: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, message: "" };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error) {
    // eslint-disable-next-line no-console
    console.error("UI Error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="card">
            <h2 style={{ marginTop: 0 }}>Something crashed</h2>
            <p className="muted">{this.state.message}</p>
            <p className="muted">Open DevTools to see full error details.</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
