import{
  createContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import questionsData from "../data/questions.json";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const timerRef = useRef(null);

  const startQuiz = () => {
    setStarted(true);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setResults([]);
    setTimeLeft(60);
  };

  const restartQuiz = () => {
    setStarted(false);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setResults([]);
    setTimeLeft(60);
  };

  const handleAnswer = useCallback(
    (index, timedOut = false) => {
      if (selected !== null) return; 

      setSelected(index);

      const correctIndex = questionsData[current].answer;
      const isCorrect = index === correctIndex;

      if (isCorrect) {
        setScore((prev) => prev + 1);
      } else if (timedOut) {
        setScore((prev) => prev - 1);
      }

      setResults((prev) => [
        ...prev,
        {
          question: questionsData[current].question,
          correctIndex,
          selected: index,
          timedOut,
        },
      ]);

      setTimeout(() => {
        setSelected(null);
        setTimeLeft(60);
        if (current + 1 < questionsData.length) {
          setCurrent((prev) => prev + 1);
        } else {
          setStarted(false); // Quiz finished
        }
      }, 1500);
    },
    [selected, current]
  );

  useEffect(() => {
    if (!started) return;

    if (timeLeft === 0) {
      handleAnswer(null, true);
      return;
    }

    timerRef.current = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);

    return () => clearTimeout(timerRef.current);
  }, [timeLeft, started, handleAnswer]);

  return (
    <QuizContext.Provider
      value={{
        started,
        current,
        selected,
        score,
        results,
        timeLeft,
        questions: questionsData,
        startQuiz,
        restartQuiz,
        handleAnswer,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
