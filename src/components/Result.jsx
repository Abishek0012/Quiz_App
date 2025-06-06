import React, { useContext } from "react";
import { QuizContext } from "../context/QuizContext";

export default function Result() {
  const { score, questions, results, restartQuiz } = useContext(QuizContext);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 px-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-10 text-gray-800">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-indigo-700">
          Your Final Score:{" "}
          <span className="text-indigo-900">
            {score} / {questions.length}
          </span>
        </h2>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {results.map((res, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg ${
                res.selected === res.correctIndex
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <p className="font-semibold mb-1">
                Q{idx + 1}: {res.question}
              </p>
              <p>
                Your answer:{" "}
                {res.timedOut
                  ? "No answer (Timed out)"
                  : res.selected !== null
                  ? questions[idx].options[res.selected]
                  : "No answer"}
              </p>
              <p>Correct answer: {questions[idx].options[res.correctIndex]}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={restartQuiz}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-2xl shadow-lg transition duration-300 focus:outline-none focus:ring-8 focus:ring-indigo-300 hover:scale-110 cursor-pointer"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
