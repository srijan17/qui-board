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
        width: "100%",
        flex: 1,
        opacity: answered ? 0.55 : 1,
        bgcolor: answered ? "#5c5d5f" : "white",
        border: "2px solid",
        borderColor: answered ? "#5c5d5f" : "primary.main",
        transition: "transform 0.15s, box-shadow 0.15s, filter 0.15s",
        transform: answered ? "rotate(0deg)" : "rotate(-0.4deg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        borderRadius: "8px",
        minHeight: 0,
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
        sx={{
          cursor: answered ? "default" : "pointer",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardContent sx={{ textAlign: "center", p: 0, display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: answered ? "text.disabled" : "primary.main",
              letterSpacing: 0,
              textShadow: answered ? "none" : "0 1px 0 rgba(0,0,0,0.18)",
              fontSize: "clamp(1rem, 5vw, 2.5rem)",
              lineHeight: 1,
            }}
          >
            {answered ? "—" : `${question.points}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}