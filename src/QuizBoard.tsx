import { Box } from "@mui/material";
import CategoryColumn from "./CategoryColumn";

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
  categories: Category[];
  answeredQuestionIds: string[];
  onQuestionSelected: (question: Question, categoryTitle: string) => void;
}

export default function QuizBoard({ categories, answeredQuestionIds, onQuestionSelected }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto",
        gap: 1.5,
        px: 2,
        py: 1.5,
        pb: 2,
        justifyContent: { xs: "flex-start", md: "center" },
        bgcolor: "rgba(255,255,255,0.55)",
        borderRadius: 3,
        border: "2px dashed",
        borderColor: "rgba(94,96,206,0.35)",
      }}
    >
      {categories.map((category) => (
        <CategoryColumn
          key={category.id}
          category={category}
          answeredQuestionIds={answeredQuestionIds}
          onQuestionSelected={onQuestionSelected}
        />
      ))}
    </Box>
  );
}