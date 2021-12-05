import React from 'react';
import { Link, withRouter } from 'react-router-dom';

export class ErrorBoundary extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  _goBack = () => {
    this.setState({ hasError: false });
    this.props.history.push('/');
  };

  render() {
    if (this.state.hasError) {
      // Render error page
      return (
        <div className="page-full">
          <div className="container">
            <div className="row mt-3 mb-5">
              <div className="col">
                <h1 className="display-1 text-center">
                  <i className="fas fa-skull"></i>&nbsp;Oops
                </h1>
                <p className="lead text-center">It seems we've strayed off the path.</p>
                <p className="lead text-center">
                  Let's <Link to="#" title="Go back to the app" onClick={this._goBack}>go back</Link> to the app.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }

};

export default withRouter(ErrorBoundary);