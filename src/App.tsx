import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LoadQuiz from "./LoadQuiz";
import { Category } from "./LoadQuiz";

interface QuizData {
  categories: Category[];
}

function validateQuestionBank(input: unknown): QuizData {
  if (!input || typeof input !== "object") {
    throw new Error("JSON must be an object with a categories array.");
  }

  const data = input as QuizData;
  if (!Array.isArray(data.categories) || data.categories.length === 0) {
    throw new Error("categories must be a non-empty array.");
  }

  data.categories.forEach((category, categoryIndex) => {
    if (!category || typeof category !== "object") {
      throw new Error(`Category at index ${categoryIndex} is invalid.`);
    }

    if (!category.id || !category.title || !Array.isArray(category.questions)) {
      throw new Error(`Category ${categoryIndex + 1} must have id, title, and questions.`);
    }

    category.questions.forEach((question, questionIndex) => {
      if (!question?.id || typeof question.points !== "number" || !question.question) {
        throw new Error(
          `Question ${questionIndex + 1} in category "${category.title}" is missing id, points, or question.`
        );
      }
    });
  });

  return data;
}

export default function App() {
  const [quizKey, setQuizKey] = useState<string | null>(null);
  const [questionBankInput, setQuestionBankInput] = useState("");
  const [questionBank, setQuestionBank] = useState<QuizData | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [controlsExpanded, setControlsExpanded] = useState(true);

  function handleReset() {
    setQuizKey(null);
    setQuestionBank(null);
    setValidationError(null);
    setControlsExpanded(true);
  }

  function handleLoadQuiz() {
    try {
      const parsed = JSON.parse(questionBankInput);
      const validated = validateQuestionBank(parsed);

      setQuestionBank(validated);
      setValidationError(null);
      setQuizKey(`custom-${Date.now()}`);
      setControlsExpanded(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Invalid JSON.";
      setValidationError(message);
      setQuizKey(null);
      setQuestionBank(null);
      setControlsExpanded(true);
    }
  }

  return (
    <Box sx={{ minHeight: "100vh", py: 3, px: 2 }}>
      <Accordion
        expanded={controlsExpanded}
        onChange={(_, expanded) => setControlsExpanded(expanded)}
        sx={{
          maxWidth: 820,
          mx: "auto",
          mb: 2,
          border: "2px dashed",
          borderColor: "secondary.main",
          bgcolor: "rgba(255,255,255,0.75)",
          boxShadow: "none",
          "&::before": { display: "none" },
        }}
      >
        <AccordionSummary
          expandIcon={<Typography sx={{ fontSize: 22, lineHeight: 1 }}>⌄</Typography>}
          sx={{ px: 2 }}
        >
          <Typography variant="h5" sx={{ textAlign: "center", color: "primary.main", width: "100%" }}>
            Quiz Controls
          </Typography>
        </AccordionSummary>

        <AccordionDetails sx={{ p: 2, pt: 0 }}>
          <Paper elevation={0} sx={{ bgcolor: "transparent" }}>
            <Stack spacing={1.5}>
              <TextField
                fullWidth
                multiline
                minRows={8}
                label="Question Bank JSON"
                placeholder='{"categories":[{"id":"movies","title":"Movies","questions":[{"id":"m-100","points":100,"question":"..."}]}]}'
                value={questionBankInput}
                onChange={(event) => setQuestionBankInput(event.target.value)}
              />

              {validationError && <Alert severity="error">{validationError}</Alert>}

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} justifyContent="center">
                <Button variant="contained" color="secondary" onClick={handleLoadQuiz}>
                  Load Quiz
                </Button>
                <Button variant="outlined" color="primary" onClick={handleReset}>
                  Reset Quiz
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </AccordionDetails>
      </Accordion>

      {quizKey && questionBank && <LoadQuiz quizKey={quizKey} questionBank={questionBank} />}
    </Box>
  );
}
