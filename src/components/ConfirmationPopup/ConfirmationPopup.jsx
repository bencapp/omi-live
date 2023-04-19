import { Box, Button } from "@mui/material";

function ConfirmationPopup({
  setDisplayConfirmation,
  handleConfirm,
  alertText,
  hidePopupText,
  confirmPopupText,
}) {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        top: "0px",
        left: "0px",
        position: "fixed",
        backgroundColor: "rgba(50, 50, 50, .5)",
        zIndex: "10",
      }}
    >
      <Box
        sx={{
          width: "80vw",
          margin: "41vh auto",
          borderRadius: "5px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "20px",
          padding: "20px",
          fontSize: "1.3rem",
          border: "1px solid black",
          zIndex: "100",
        }}
      >
        <Box>{alertText}</Box>

        <Box sx={{ display: "flex", gap: "15px", alignSelf: "center" }}>
          <Button onClick={() => setDisplayConfirmation(false)}>
            {hidePopupText}
          </Button>
          <Button
            color="warning"
            sx={{ color: "black" }}
            onClick={handleConfirm}
          >
            {confirmPopupText}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ConfirmationPopup;
