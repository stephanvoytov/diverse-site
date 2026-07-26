"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="h-[320px] md:h-[480px] flex items-center justify-center bg-brand-gray-100 text-brand-gray-400 text-sm">
            Карта временно недоступна
          </div>
        )
      );
    }
    return this.props.children;
  }
}
