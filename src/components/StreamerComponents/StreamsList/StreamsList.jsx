import { Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useTheme } from "@mui/material";
import dayjs from "dayjs";

function StreamsList() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useHistory();
  const streams = useSelector((store) => store.streams.streams);

  useEffect(() => {
    dispatch({ type: "FETCH_STREAMS" });
  }, []);

  // when the user clicks on a stream, go to the stream edit view
  const handleStreamClick = (stream) => {
    dispatch({ type: "SET_CURRENT_STREAM", payload: stream });
    history.push(`/edit-stream/${stream.id}`);
  };

  const handlePlanNewStream = () => {
    // TODO: post new stream to the database and redirect to edit stream
    dispatch({ type: "POST_EMPTY_STREAM", payload: { history } });
  };

  return (
    <>
      {streams.map((stream) => (
        <Box
          onClick={() => handleStreamClick(stream)}
          style={{
            backgroundColor: theme.palette.secondary.main,
            borderRadius: "5px",
            padding: "10px",
          }}
          key={stream.id}
        >
          <b>{stream.title}</b>
          <br></br>
          {dayjs(stream.scheduled).format("MM/DD/YYYY")}
        </Box>
      ))}
      <Button onClick={() => handlePlanNewStream()}>PLAN NEW STREAM</Button>
    </>
  );
}

export default StreamsList;

// StreamerProductsList;
