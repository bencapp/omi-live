import { Box, useTheme, TextField, InputLabel, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";

import { useState } from "react";

function EditStreamNameDate() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [newDate, setNewDate] = useState();
  const [newTitle, setNewTitle] = useState("");

  const currentStream = useSelector((store) => store.currentStream);

  const handleSubmit = () => {
    dispatch({
      type: "UPDATE_STREAM_TITLE_DATE",
      payload: {
        id: currentStream.id,
        title: newTitle,
        scheduled: dayjs(newDate).toJSON(),
      },
    });
  };

  return (
    <Box
      sx={{
        height: "auto",
        width: "90%",
        borderRadius: "5px",
        position: "abolute",
        backgroundColor: theme.palette.secondary.main,
        margin: "55% auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        padding: "20px 0px",
      }}
    >
      {dayjs(newDate).toJSON()}
      <div>CREATE A NEW STREAM</div>
      <InputLabel>TITLE</InputLabel>
      <TextField
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      ></TextField>
      <InputLabel>DATE</InputLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker date={newDate} onChange={(date) => setNewDate(date)} />
      </LocalizationProvider>
      <Button onClick={handleSubmit}>SUBMIT</Button>
    </Box>
  );
}

export default EditStreamNameDate;
