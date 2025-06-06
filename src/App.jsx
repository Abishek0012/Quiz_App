import React, { useContext } from "react";
import { QuizContext, QuizProvider } from "./context/QuizContext";
import Home from "./components/Home";
import QuestionCard from "./components/QuestionCard";
import Result from "./components/Result";

function AppContent() {
  const { started, results, questions } = useContext(QuizContext);

  if (!started) {
    if (results.length === questions.length && questions.length > 0) {
      return <Result />;
    }
    return <Home />;
  }

  return <QuestionCard />;
}

 function App() {
  return (
    <QuizProvider>
      <AppContent />
    </QuizProvider>
  );
}
export default App;
