import { useSelector } from "react-redux";

function EditStream() {
  const currentStreamID = useSelector((store) => store.currentStreamID);
  return <div>editing stream: {currentStreamID}</div>;
}

export default EditStream;
