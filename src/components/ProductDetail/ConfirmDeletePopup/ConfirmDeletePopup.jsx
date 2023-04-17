import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function ConfirmDeletePopup({ setDisplayConfirmDelete, productID }) {
  const currentProduct = useSelector((store) => store.currentProduct);
  const dispatch = useDispatch(); 
  const history = useHistory(); 

  const handleDelete = () => {
    dispatch ({
      type: "DELETE_PRODUCT", 
      payload: productID
    })
    history.push("/home/:products")
  };
  return (
    <Box
      sx={{
        //   height: "250px",
        width: "80%",
        position: "absolute",
        borderRadius: "5px",
        backgroundColor: "white",
        margin: "225px auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "20px",
        padding: "20px",
        fontSize: "1.3rem",
      }}
    >
      <Box>Are you sure you want to delete this product from the database?</Box>

      <Box sx={{ display: "flex", gap: "15px", alignSelf: "center" }}>
        <Button onClick={() => setDisplayConfirmDelete(false)}>CANCEL</Button>
        <Button onClick={handleDelete}>CONFIRM</Button>
      </Box>
    </Box>
  );
}

export default ConfirmDeletePopup;
