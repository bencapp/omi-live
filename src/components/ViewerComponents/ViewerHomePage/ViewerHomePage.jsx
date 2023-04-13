import {Button} from '@mui/material'
import { useHistory } from 'react-router-dom';

function ViewerHomePage() {
  const history = useHistory();
  return (<div>
    This is the viewer home page!
    <Button onClick={() => {history.push('/live/omi')}}>Check out the stream</Button>
  </div>)
}

export default ViewerHomePage;
