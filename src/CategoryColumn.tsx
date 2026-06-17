import { Box, Typography } from "@mui/material";
import QuestionCard from "./QuestionCard";

interface Question {
  id: string;
  points: number;
  question: string;
}

interface Category {
  id: string;
  title: string;
  questions: Question[];
}

interface Props {
  category: Category;
  answeredQuestionIds: string[];
  onQuestionSelected: (question: Question, categoryTitle: string) => void;
}

export default function CategoryColumn({ category, answeredQuestionIds, onQuestionSelected }: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2, minWidth: 150 }}>
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          p: 1.5,
          borderRadius: "16px 10px 16px 12px",
          textAlign: "center",
          minHeight: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid rgba(255,255,255,0.5)",
          transform: "rotate(-0.5deg)",
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.2, fontSize: 18 }}>
          {category.title}
        </Typography>
      </Box>

      {category.questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          answered={answeredQuestionIds.includes(question.id)}
          onClick={() => onQuestionSelected(question, category.title)}
        />
      ))}
    </Box>
  );
}
