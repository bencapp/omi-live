import { Box, Button } from "@mui/material";

function ConfirmationPopup({
  setDisplayConfirmation,
  handleConfirm,
  alertText,
  hidePopupText,
  confirmPopupText,
  top,
}) {
  return (
    <Box
      sx={{
        //   height: "250px",
        width: "80vw",
        position: "absolute",
        top: top ? top : "",
        left: "4.8vw",
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
        zIndex: "10",
      }}
    >
      <Box>{alertText}</Box>

      <Box sx={{ display: "flex", gap: "15px", alignSelf: "center" }}>
        <Button onClick={() => setDisplayConfirmation(false)}>
          {hidePopupText}
        </Button>
        <Button color="warning" sx={{ color: "black" }} onClick={handleConfirm}>
          {confirmPopupText}
        </Button>
      </Box>
    </Box>
  );
}

export default ConfirmationPopup;
