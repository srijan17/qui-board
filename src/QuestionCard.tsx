import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

interface Question {
  id: string;
  points: number;
  question: string;
}

interface Props {
  question: Question;
  answered: boolean;
  onClick: () => void;
}

export default function QuestionCard({ question, answered, onClick }: Props) {
  return (
    <Card
      sx={{
        minWidth: "15vw",
        minHeight: "10vh",
        opacity: answered ? 0.4 : 1,
        bgcolor: answered ? "grey.300" : "secondary.main",
        transition: "transform 0.15s, box-shadow 0.15s",
        "&:hover": answered
          ? {}
          : {
              transform: "scale(1.04)",
              boxShadow: 6,
            },
      }}
      elevation={answered ? 0 : 3}
    >
      <CardActionArea
        disabled={answered}
        onClick={onClick}
        sx={{ cursor: answered ? "default" : "pointer" }}
      >
        <CardContent sx={{ textAlign: "center", py: 2 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: answered ? "text.disabled" : "white" }}
          >
            {answered ? "—" : `$${question.points}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}