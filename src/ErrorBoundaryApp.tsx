import { Component, ErrorInfo } from "react";

class ErrorBoundaryApp extends Component<any, any> {
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    return this.props.children;
  }
}

export default ErrorBoundaryApp;
