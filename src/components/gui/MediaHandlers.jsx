import {Box, ButtonGroup} from '@mui/material';
import ScreenShoot from './ScreenShoot';
import Pdf from './Pdf';
// import SaveBtn from './SaveBtn';

export default function MediaHandlers() {
  return (
    <Box
      display="flex"
      alignItems="center"
      p={2}
      gap={2}
      flexWrap="wrap"
    >
      <ButtonGroup>
        {/*<SaveBtn />*/}
        <ScreenShoot />
      </ButtonGroup>

      <Pdf />
    </Box>
  );
}
