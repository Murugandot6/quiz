import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { quizQuestions } from "@/data/quizData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { showSuccess, showError } from "@/utils/toast"; // Corrected import

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;
  const progress = ((currentQuestionIndex + (isAnswered ? 1 : 0)) / totalQuestions) * 100;

  const handleOptionClick = (option: string) => {
    if (isAnswered) return; // Prevent multiple selections

    setSelectedOption(option);
    setIsAnswered(true);

    if (option === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
      showSuccess("Correct!"); // Using showSuccess
    } else {
      showError(`Wrong! The correct answer was: ${currentQuestion.correctAnswer}`); // Using showError
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      navigate("/quiz-result", { state: { score, totalQuestions } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Quizarium</CardTitle>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </div>
          <Progress value={progress} className="w-full mt-2" />
        </CardHeader>
        <CardContent>
          <h2 className="text-lg font-semibold mb-4 text-center">{currentQuestion.question}</h2>
          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((option) => (
              <Button
                key={option}
                variant={
                  isAnswered
                    ? option === currentQuestion.correctAnswer
                      ? "success"
                      : option === selectedOption
                        ? "destructive"
                        : "outline"
                    : "outline"
                }
                onClick={() => handleOptionClick(option)}
                disabled={isAnswered}
                className="w-full justify-start text-left px-4 py-2 rounded-md"
              >
                {option}
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleNextQuestion} disabled={!isAnswered}>
            {currentQuestionIndex < totalQuestions - 1 ? "Next Question" : "Finish Quiz"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Quiz;