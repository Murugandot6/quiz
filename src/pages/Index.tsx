import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">Welcome to Quizarium!</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Test your knowledge with our fun quizzes.
        </p>
        <Button
          onClick={() => navigate("/quiz")}
          className="px-8 py-3 text-lg"
        >
          Start Quiz
        </Button>
      </div>
      <div className="absolute bottom-4">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;