import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import QuizBoard from "./QuizBoard";
import QuestionModal from "./QuestionModal";
import ResetConfirmationDialog from "./ResetConfirmationDialog";
import quizData from "./questions.json";

type QuestionType = "thematrix" | "image" | "text"  | "audio" ;
export interface Question {
  id: string;
  points: number;
  imageUrl?: string;
  audioUrl?: string;
  audioUrls?: string;
  question: string;
  type?: QuestionType;
  tag?: string;
  options?: string[];
  optionsp?: string[];
}

export interface Category {
  id: string;
  title: string;
  questions: Question[];
}

interface QuizData {
  categories: Category[];
}

const STORAGE_KEY = "quiz-board-progress";

function loadAnswered(quizKey: string): string[] {
  try {
    const saved = localStorage.getItem(`${STORAGE_KEY}-${quizKey}`);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function LoadQuiz(props:{quizKey:string, questionBank: QuizData}) {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<string[]>(() => loadAnswered(props.quizKey));
  const [resetOpen, setResetOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}-${props.quizKey}`, JSON.stringify(answeredQuestionIds));
  }, [answeredQuestionIds, props.quizKey]);

  function handleQuestionSelected(question: Question, categoryTitle: string) {
    setSelectedQuestion(question);
    setSelectedCategory(categoryTitle);
  }

  function handleComplete() {
    if (selectedQuestion) {
      setAnsweredQuestionIds((prev) => [...prev, selectedQuestion.id]);
    }
    setSelectedQuestion(null);
  }

  function handleClose() {
    setSelectedQuestion(null);
  }

  function handleReset() {
    setAnsweredQuestionIds([]);
    localStorage.removeItem(`${STORAGE_KEY}-${props.quizKey}`);
    setResetOpen(false);
  }

  const categories = props.questionBank?.categories ?? (quizData.categories as Category[]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 3 }}>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, color: "primary.main" }}>
         Night
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ mt: 1 }}
          onClick={() => setResetOpen(true)}
        >
          Reset Board
        </Button>
      </Box>

      <QuizBoard
        categories={categories}
        answeredQuestionIds={answeredQuestionIds}
        onQuestionSelected={handleQuestionSelected}
      />

      {selectedQuestion && (
        <QuestionModal
          question={selectedQuestion}
          categoryTitle={selectedCategory}
          onComplete={handleComplete}
          onClose={handleClose}
        />
      )}

      <ResetConfirmationDialog
        open={resetOpen}
        onConfirm={handleReset}
        onCancel={() => setResetOpen(false)}
      />
    </Box>
  );
}