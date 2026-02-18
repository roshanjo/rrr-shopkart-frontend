// ==================================================
// IMPORTS
// ==================================================

import React from "react";


// ==================================================
// ERROR BOUNDARY COMPONENT
// ==================================================

export default class ErrorBoundary extends React.Component {

  // ------------------------------------------------
  // Constructor
  // ------------------------------------------------

  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      hasError: false
    };
  }


  // ------------------------------------------------
  // This lifecycle method runs when an error occurs
  // ------------------------------------------------

  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }


  // ------------------------------------------------
  // Render Method
  // ------------------------------------------------

  render() {

    // If an error happened → show fallback UI
    if (this.state.hasError) {

      return (
        <div className="min-h-screen flex items-center justify-center">

          <p className="text-lg font-semibold">
            Something went wrong. Please refresh.
          </p>

        </div>
      );
    }

    // If no error → render children normally
    return this.props.children;
  }
}