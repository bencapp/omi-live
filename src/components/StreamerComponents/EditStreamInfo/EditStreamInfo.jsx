import { Box, useTheme, TextField, InputLabel, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";

import { useState } from "react";

function EditStreamInfo({ handleCancelEditInfo }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useHistory();

  const [newDate, setNewDate] = useState();
  const [newTitle, setNewTitle] = useState();
  const [newDescription, setNewDescription] = useState();

  const [displayCancelConfirm, setDisplayCancelConfirm] = useState(false);

  const currentStream = useSelector((store) => store.currentStream);

  const handleSubmit = () => {
    dispatch({
      type: "UPDATE_STREAM_INFO",
      payload: {
        id: currentStream.id,
        title: newTitle,
        description: newDescription,
        scheduled: dayjs(newDate).toJSON(),
        history: history,
      },
    });
  };

  return (
    <Box
      sx={{
        height: "auto",
        width: "90%",
        borderRadius: "5px",
        backgroundColor: theme.palette.secondary.main,
        margin: "30px auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        padding: "20px 0px",
      }}
    >
      <div>CREATE A NEW STREAM</div>
      <InputLabel>TITLE</InputLabel>
      <TextField
        defaultValue={currentStream?.title}
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      ></TextField>
      <InputLabel>DESCRIPTION</InputLabel>
      <TextField
        multiline
        defaultValue={currentStream?.description}
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      ></TextField>
      <InputLabel>DATE</InputLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          defaultValue={dayjs(currentStream.scheduled)}
          date={newDate}
          onChange={(date) => setNewDate(date)}
        />
      </LocalizationProvider>
      {displayCancelConfirm ? (
        <>
          <Box> Cancel changes and return to stream?</Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Button onClick={() => setDisplayCancelConfirm(false)}>BACK</Button>
            <Button
              onClick={handleCancelEditInfo}
              color="warning"
              sx={{ color: "black" }}
            >
              CONFIRM
            </Button>
          </Box>
        </>
      ) : (
        <Box sx={{ display: "flex", gap: "20px" }}>
          <Button
            onClick={() => setDisplayCancelConfirm(true)}
            color="warning"
            sx={{ color: "black" }}
          >
            CANCEL
          </Button>
          <Button onClick={handleSubmit}>SUBMIT</Button>
        </Box>
      )}
    </Box>
  );
}

export default EditStreamInfo;
