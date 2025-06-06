import { useContext } from "react";
import { QuizContext } from "../context/QuizContext";

export default function Home() {
  const { startQuiz } = useContext(QuizContext);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 px-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10 text-center text-gray-800">
        <h1 className="text-4xl font-extrabold mb-6 text-indigo-900">
          Welcome to the Quiz App!
        </h1>
        <p className="mb-5 text-lg leading-relaxed ">
          <ul className="text-left list-disc">
            <li>
              You will be provided Questions and four options for an answer.
            </li>
            <li>
              If you select the correct answer your score will increase my 1.
            </li>
            <li>You have one minute to answer each question.</li>
            <li>
              You will be provided your Final score with summary of the result
              at the end of the quiz.
            </li>
          </ul>
        </p>
        <h1 className="text-2xl font-bold text-indigo-900">Good Luck</h1>
        <button
          onClick={startQuiz}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-2xl shadow-lg transition duration-300 focus:outline-none focus:ring-8 focus:ring-indigo-300 hover:scale-110 cursor-pointer"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
