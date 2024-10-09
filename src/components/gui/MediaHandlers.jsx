import {Box, ButtonGroup} from '@mui/material';

import ScreenShoot from 'components/gui/ScreenShoot';
import Pdf from 'components/gui/Pdf';
// import SaveBtn from 'components/gui/SaveBtn';

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
