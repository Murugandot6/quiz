import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, totalQuestions } = location.state || { score: 0, totalQuestions: 0 };

  const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xl">
            You scored <span className="font-bold text-primary">{score}</span> out of{" "}
            <span className="font-bold text-primary">{totalQuestions}</span> questions!
          </p>
          <p className="text-2xl font-extrabold text-green-600 dark:text-green-400">
            {percentage.toFixed(0)}%
          </p>
          <Button onClick={() => navigate("/")} className="mt-6">
            Go to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizResult;