import { useSelector } from "react-redux";
import { Box, Button, useTheme } from "@mui/material";
import EditStreamInfo from "../EditStreamInfo/EditStreamInfo";
import EditStreamProduct from "./EditStreamProduct/EditStreamProduct";
import dayjs from "dayjs";

function EditStream() {
  const currentStream = useSelector((store) => store.currentStream);
  const theme = useTheme();

  return (
    <Box sx={{ padding: "0px 20px" }}>
      {/* if stream does not have a date planned, render 'create a new stream'; else render 'edit stream' */}
      {!currentStream.scheduled ? (
        <EditStreamInfo />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Box sx={{ fontSize: "1.5em", fontWeight: "bold" }}>
              EDIT STREAM
            </Box>
            <Box
              sx={{
                fontSize: "1.3em",
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <b>{currentStream.title}</b>,{" "}
                {dayjs(currentStream.scheduled).format("DD/MM/YYYY")}
              </Box>
              <Button size="small">EDIT INFO</Button>
            </Box>

            {currentStream.products[0].name ? (
              currentStream.products
                .sort((a, b) => a.order - b.order)
                .map((product) => (
                  <EditStreamProduct key={product.id} product={product} />
                ))
            ) : (
              <Box>No products yet! Add one to get started.</Box>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button>ADD EXISTING ITEM</Button>
              <Button>ADD NEW ITEM</Button>
            </Box>
            <Button sx={{ alignSelf: "end" }} color="warning">
              GO LIVE
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default EditStream;
