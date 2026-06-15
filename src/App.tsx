import { useState } from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import LoadQuiz from "./LoadQuiz";

export default function App() {
  const [quizKey, setQuizKey] = useState<string | null>(null);

  function handleReset() {
    setQuizKey(null);
  }

  return (
    <Box sx={{ minHeight: "100vh", py: 3, px: 2 }}>
      <Paper
        elevation={0}
        sx={{
          maxWidth: 820,
          mx: "auto",
          mb: 2,
          p: 2,
          border: "2px dashed",
          borderColor: "secondary.main",
          bgcolor: "rgba(255,255,255,0.75)",
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center", color: "primary.main", mb: 1 }}>
          Quiz Controls
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} justifyContent="center">
          <Button variant="contained" color="secondary" onClick={() => setQuizKey("something")}>Start Quiz</Button>
          <Button variant="outlined" color="primary" onClick={handleReset}>Reset Quiz</Button>
        </Stack>
      </Paper>

      { quizKey && <LoadQuiz quizKey={quizKey} />}
      
    </Box>
  );
}