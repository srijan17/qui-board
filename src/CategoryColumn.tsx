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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: 0.6, sm: 0.7, md: 0.8 },
        flex: 1,
        minWidth: 0,
        height: "100%",
      }}
    >
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          p: { xs: 0.8, sm: 1, md: 1.2 },
          borderRadius: "16px 10px 16px 12px",
          textAlign: "center",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid rgba(255,255,255,0.5)",
          transform: "rotate(-0.5deg)",
          minHeight: { xs: 50, sm: 60, md: 68 },
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.2, fontSize: { xs: 14, sm: 16, md: 18 } }}>
          {category.title}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 0.6, sm: 0.7, md: 0.8 }, flex: 1, minHeight: 0 }}>
        {category.questions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            answered={answeredQuestionIds.includes(question.id)}
            onClick={() => onQuestionSelected(question, category.title)}
          />
        ))}
      </Box>
    </Box>
  );
}
