
import FeedbackForm from "./components/FeedbackForm";
import { FeedbackProvider } from "./context/FeedbackContext";
import { useState } from "react";
import Reviews from "./components/Reviews";
function App() {
  
  return (
    <>
      <FeedbackProvider>
        <Reviews />
        <div className="app">
          <div className="container">
            <FeedbackForm />
          </div>
        </div>
      </FeedbackProvider>
    </>
  );
}

export default App;
