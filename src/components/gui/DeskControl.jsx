import Grid from '@mui/material/Grid2';
import {Box, FormControl, FormControlLabel, FormGroup, InputLabel, NativeSelect, Switch} from '@mui/material';
import { useTranslation } from 'react-i18next';
import RangeInput from 'components/gui/RangeInput';

import useStore from 'store/useStore';

export default function DeskControl() {
  const { t } = useTranslation();
  const desk = useStore((state) => state.desk);
  const setDesk = useStore((state) => state.setDesk);
  const deskHeight = useStore((state) => state.deskHeight);
  const setDeskHeight = useStore((state) => state.setDeskHeight);

  return (
    <Box
      // display="flex"
      // alignItems="center"
      // // my={2}
      // p={2}
      // gap={2}
      // flexWrap="wrap"
      display="flex"
      alignItems="center"
      gap={2}
      flexWrap="wrap"
    >
      <Grid container spacing={2} p={2}>
        <Grid size={12}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  onChange={(e) => {
                    setDesk(e.target.checked);
                  }}
                  checked={desk}
                />
              }
              label={t('deskToggle')}
              // sx={{
              //   m: 0,
              // }}
            />
          </FormGroup>
        </Grid>
        {desk && (
          <>
            <Grid size={12}>
              <RangeInput
                label={t('deskHeight')}
                min={0.5}
                max={1.8}
                step={0.1}
                id="deskHeight"
                onChange={(e) => {setDeskHeight(Number(e.target.value))}}
                value={deskHeight}
              />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}
