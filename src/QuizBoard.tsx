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
        gap: 1,
        px: 2,
        pb: 2,
        justifyContent: { xs: "flex-start", md: "center" },
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