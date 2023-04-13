import React, { Component, ErrorInfo } from "react";
import Bugsnag from "@bugsnag/js";

class ErrorBoundaryApp extends Component<any, any> {
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (process.env.NODE_ENV === "production") {
      const ErrorBoundary =
        Bugsnag.getPlugin("react")!.createErrorBoundary(React);

      return <ErrorBoundary>{this.props.children}</ErrorBoundary>;
    }
    return this.props.children;
  }
}

export default ErrorBoundaryApp;
