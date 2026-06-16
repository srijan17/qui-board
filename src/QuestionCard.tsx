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
        opacity: answered ? 0.55 : 1,
        bgcolor: answered ? "#d8dde4" : "secondary.main",
        border: "2px solid",
        borderColor: answered ? "#c3c9d2" : "rgba(255,255,255,0.65)",
        transition: "transform 0.15s, box-shadow 0.15s, filter 0.15s",
        transform: answered ? "rotate(0deg)" : "rotate(-0.4deg)",
        "&:hover": answered
          ? {}
          : {
              transform: "scale(1.04) rotate(0.2deg)",
              boxShadow: 7,
              filter: "saturate(1.07)",
            },
      }}
      elevation={answered ? 0 : 3}
    >
      <CardActionArea
        disabled={answered}
        onClick={onClick}
        sx={{ cursor: answered ? "default" : "pointer", minWidth: "15vw", minHeight: "10vh" }}
      >
        <CardContent sx={{ textAlign: "center", py: 2.2 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: answered ? "text.disabled" : "white",
              letterSpacing: 0.8,
              textShadow: answered ? "none" : "0 1px 0 rgba(0,0,0,0.18)",
            }}
          >
            {answered ? "—" : `${question.points}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}