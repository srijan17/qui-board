import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";

import { Question } from "./LoadQuiz";

interface Props {
  question: Question;
  categoryTitle: string;
  onComplete: () => void;
  onClose: () => void;
}

export default function QuestionModal({
  question,
  categoryTitle,
  onComplete,
  onClose,
}: Props) {
  const isSpecialTile =
    question.tag === "Challenger" ||
    question.tag === "TequilaTile";

  const [matrixIndex, setMatrixIndex] = useState(0);
  const [showAnnouncement, setShowAnnouncement] =
    useState(isSpecialTile);

  useEffect(() => {
    setMatrixIndex(0);
    setShowAnnouncement(
      question.tag === "Challenger" ||
      question.tag === "TequilaTile"
    );
  }, [question.id]);

  const matrixImages = question.optionsp ?? question.options ?? [];
  const hasMatrixSlides = matrixImages.length > 0;
  const matrixStep = hasMatrixSlides && matrixImages.length > 1
    ? question.points / (matrixImages.length - 1)
    : 0;
  const matrixPoints = Math.max(
    0,
    Math.round(question.points - matrixIndex * matrixStep)
  );

  const announcementConfig = {
    Challenger: {
      emoji: "⚔️",
      title: "CHALLENGER TILE",
      subtitle:
        "Challenge another team! Whoever answers correctly wins the points.",
      color: "#d32f2f",
      buttonText: "I ACCEPT ⚔️",
    },

    TequilaTile: {
      emoji: "🍹",
      title: "TEQUILA TILE",
      subtitle:
        "The Quiz Gods demand tribute. Please drink responsibly.",
      color: "#f57c00",
      buttonText: "CHEERS 🍻",
    },
  };

  const banner =
    question.tag &&
    announcementConfig[
      question.tag as keyof typeof announcementConfig
    ];

  const typeRenderers: Record<string, () => JSX.Element> = {
    thematrix: () => {
      if (!hasMatrixSlides) {
        return (
          <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary" }}>
            No matrix images configured for this question.
          </Typography>
        );
      }

      return (
        <Box sx={{ width: "100%", maxWidth: 900, mx: "auto" }}>
          <Box
            component="img"
            src={matrixImages[matrixIndex]}
            alt={`Matrix step ${matrixIndex + 1}`}
            sx={{
              width: "100%",
              maxHeight: "48vh",
              objectFit: "contain",
              borderRadius: 2,
              mb: 2,
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, mb: 1 }}>
            <Button
              variant="outlined"
              onClick={() => setMatrixIndex((prev) => Math.max(0, prev - 1))}
              disabled={matrixIndex === 0}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              onClick={() =>
                setMatrixIndex((prev) => Math.min(matrixImages.length - 1, prev + 1))
              }
              disabled={matrixIndex === matrixImages.length - 1}
            >
              Next
            </Button>
          </Box>

          <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary" }}>
            Slide {matrixIndex + 1} of {matrixImages.length} • Current points: {matrixPoints}
          </Typography>
        </Box>
      );
    },
    image: () => (
      <Box sx={{ width: "100%", textAlign: "center" }}>
        {question.imageUrl && (
          <Box
            component="img"
            src={question.imageUrl}
            alt="Question visual"
            sx={{
              display: "block",
              maxWidth: "100%",
              maxHeight: "48vh",
              objectFit: "contain",
              mx: "auto",
              mb: 2,
              borderRadius: 2,
            }}
          />
        )}
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {question.options?.[0] ?? question.question}
        </Typography>
      </Box>
    ),
    text: () => (
      <Box sx={{ width: "100%", textAlign: "center" }}>
        {question.imageUrl && (
          <Box
            component="img"
            src={question.imageUrl}
            alt="Question visual"
            sx={{
              display: "block",
              maxWidth: "100%",
              maxHeight: "32vh",
              objectFit: "contain",
              mx: "auto",
              mb: 2,
              borderRadius: 2,
            }}
          />
        )}
        <Typography variant="h5" sx={{ textAlign: "center", fontWeight: 500, wordBreak: "break-word" }}>
          {question.question}
        </Typography>
      </Box>
    ),
    audio: () => (
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Box sx={{ mb: 2 }}>
          <audio
            controls
            src={question.audioUrl ?? question.audioUrls}
            style={{ width: "100%", maxWidth: 520 }}
          >
            Your browser does not support the audio element.
          </audio>
        </Box>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {question.question}
        </Typography>
      </Box>
    ),
  };

  const renderQuestionContent = () => {
    const key = question.type ?? "text";
    const renderer = typeRenderers[key];
    if (renderer) {
      return renderer();
    }

    return (
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          fontWeight: 500,
          width: "100%",
          wordBreak: "break-word",
        }}
      >
        {question.question}
      </Typography>
    );
  };

  return (
    <Dialog
      open
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        sx: {
          width: "min(90vw, 1100px)",
          minHeight: "80vh",
          maxHeight: "90vh",
          m: 2,
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
        minHeight: "80vh",
          maxHeight: "90vh",
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            bgcolor: "primary.main",
            color: "white",
            pb: 1,
          }}
        >
          <Typography
            variant="overline"
            sx={{
                textAlign: "center",
              display: "block",
              opacity: 0.85,
            }}
          >
            {categoryTitle}
          </Typography>

          <Chip
            label={`${question.type === "thematrix" ? matrixPoints : question.points} points`}
            sx={{
              bgcolor: "secondary.main",
              color: "white",
              fontWeight: 700,
              fontSize: 16,
            }}
          />
        </DialogTitle>

        <DialogContent
          sx={{
            py: 4,
            px: { xs: 2, sm: 4 },
            flex: 1,
            overflowY: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {renderQuestionContent()}
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 2,
            gap: 1,
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
          >
            Close
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={onComplete}
          >
            Mark Answered
          </Button>
        </DialogActions>


        {showAnnouncement && banner && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(0,0,0,1)",
              zIndex: 10,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              p: 3,
            }}
          >
            <Paper
              elevation={12}
              sx={{
                p: { xs: 3, sm: 5 },
                width: "min(100%, 760px)",
                height: "min(80%, 500px)",
                overflowY: "auto",

                textAlign: "center",

                borderRadius: 4,

                border: `6px solid ${banner.color}`,
              }}
            >
              <Typography
                variant="h1"
                sx={{ mb: 2 }}
              >
                {banner.emoji}
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  mb: 2,
                  fontWeight: 800,
                  color: banner.color,
                }}
              >
                {banner.title}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  color: "text.secondary",
                }}
              >
                {banner.subtitle}
              </Typography>

              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: banner.color,
                  "&:hover": {
                    bgcolor: banner.color,
                    filter: "brightness(0.9)",
                  },
                }}
                onClick={() =>
                  setShowAnnouncement(false)
                }
              >
                {banner.buttonText}
              </Button>
            </Paper>
          </Box>
        )}
      </Box>
    </Dialog>
  );
}