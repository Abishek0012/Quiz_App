import { useContext } from "react";
import { QuizContext } from "../context/QuizContext";

export default function QuestionCard() {
  const { current, questions, selected, handleAnswer, timeLeft, score } =
    useContext(QuizContext);
  const question = questions[current];

  //initilizing some styles to use in Buttons ///////////////////////////////////////////////////////////

  let baseClasses =
    "py-3 rounded-xl font-semibold transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400";
  let bgColor = "bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer";

  // ///////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 px-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-gray-800">
        <h3 className="text-2xl font-bold mb-5 text-center">
          Question {current + 1} of {questions.length}
        </h3>
        <p className="mb-8 text-center text-lg leading-relaxed">
          {question.question}
        </p>
        <div className="flex flex-col gap-4">
          {question.options.map((opt, i) => {
            if (selected !== null) {
              if (i === question.answer) {
                bgColor = "bg-green-500 text-white shadow-lg";
              } else if (i === selected && i !== question.answer) {
                bgColor = "bg-red-500 text-white shadow-lg";
              } else {
                bgColor = "bg-gray-200 text-gray-500 cursor-not-allowed";
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={selected !== null}
                className={`${baseClasses} ${bgColor}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center mt-8 text-gray-600">
          <p className="font-mono text-lg">
            <i class="bx bx-time"></i> Time left:{" "}
            <span className="font-bold">{timeLeft}</span>s
          </p>
          <p className="font-semibold text-lg">
            Score: <span className="text-indigo-600">{score}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
