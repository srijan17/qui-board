import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import QuizBoard from "./QuizBoard";
import QuestionModal from "./QuestionModal";
import ResetConfirmationDialog from "./ResetConfirmationDialog";
import quizData from "./questions.json";
import LoadQuiz from "./LoadQuiz";

export default function App() {
  const [quizKey, setQuizKey] = useState<string | null>(null);

  function handleReset() {
    setQuizKey(null);
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 3 }}>

     {/* mui collapsible for admin operations. load quiz , quiz source, reset quiz */}

     <button onClick={()=>{setQuizKey("something")}}>LoadQuiz</button>
     <button onClick={()=>{handleReset()}}>reset</button>
    
      { quizKey && <LoadQuiz quizKey={quizKey} />}
      
    </Box>
  );
}