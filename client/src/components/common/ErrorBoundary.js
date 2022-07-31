import { Component } from 'react';
import { revalidateToken } from '../../api/user';

// Error boundaries currently have to be classes.
export class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    // Is the current token expired?
    if (error.name === 'AxiosError' && error.response.status === 403) {
      revalidateToken().then(() => ({ hasError: false }));
    }

    return {
      hasError: true,
      error,
    };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
