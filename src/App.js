import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import feedbackData from "./Data/FeedbackData";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import { FeedbackProvider } from "./context/FeedbackContext";
function App() {
  return (
    <>
      <FeedbackProvider>
        <Header text="feedback UI" />
        <div className="container">
          <FeedbackForm />
          <FeedbackStats />
          <FeedbackList  />
        </div>
      </FeedbackProvider>
    </>
  );
}

export default App;
