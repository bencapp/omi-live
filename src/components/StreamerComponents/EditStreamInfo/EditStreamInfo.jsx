import { Box, useTheme, TextField, InputLabel, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";

import ConfirmationPopup from "../../ConfirmationPopup/ConfirmationPopup";

import { useState } from "react";

function EditStreamInfo({ closeEditStreamInfo, newStream }) {
  const history = useHistory();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [newDate, setNewDate] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [displayConfirmCancel, setDisplayConfirmCancel] = useState(false);

  const currentStream = useSelector((store) => store.currentStream);

  const handleSubmit = () => {
    dispatch({
      type: "UPDATE_STREAM_INFO",
      payload: {
        id: currentStream.id,
        title: newTitle,
        description: newDescription,
        scheduled: dayjs(newDate).toJSON(),
      },
    });
    closeEditStreamInfo();
  };

  useEffect(() => {
    if (currentStream.id) {
      setNewTitle(currentStream.title);
      setNewDescription(currentStream.description);
      setNewDate(dayjs(currentStream.scheduled));
    }
  }, []);

  const handleCancel = () => {
    if (newStream) {
      dispatch({ type: "DELETE_STREAM", payload: currentStream.id });
      history.push("/home");
    }
    closeEditStreamInfo();
  };

  return (
    <>
      {displayConfirmCancel && (
        <ConfirmationPopup
          setDisplayConfirmation={setDisplayConfirmCancel}
          handleConfirm={handleCancel}
          alertText={`Cancel changes?`}
          hidePopupText="GO BACK"
          confirmPopupText="CONFIRM"
        />
      )}
      <Box
        sx={{
          top: "0px",
          height: "100vh",
          width: "100vw",
          position: "fixed",
          zIndex: "5",
          backgroundColor: "rgba(50, 50, 50, .5)",
        }}
      >
        <Box
          sx={{
            height: "auto",
            width: "70%",
            borderRadius: "5px",
            backgroundColor: theme.palette.secondary.main,
            margin: "20vh auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            padding: "20px 0px",
            border: "1px solid black",
          }}
        >
          {newStream ? (
            <div>CREATE A NEW STREAM</div>
          ) : (
            <div>EDIT STREAM INFO</div>
          )}

          <InputLabel>TITLE</InputLabel>
          <TextField
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          ></TextField>
          <InputLabel>DESCRIPTION</InputLabel>
          <TextField
            multiline
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          ></TextField>
          <InputLabel>DATE</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={newDate}
              onChange={(date) => setNewDate(date)}
              minDate={dayjs()}
            />
          </LocalizationProvider>

          <Box sx={{ display: "flex", gap: "20px" }}>
            <Button
              onClick={() => setDisplayConfirmCancel(true)}
              color="warning"
              sx={{ color: "black" }}
            >
              CANCEL
            </Button>
            <Button onClick={handleSubmit}>SUBMIT</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default EditStreamInfo;
