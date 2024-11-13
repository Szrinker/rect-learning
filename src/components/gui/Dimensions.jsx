import Grid from '@mui/material/Grid2';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import RangeInput from 'components/gui/RangeInput';

import useStore from 'store/useStore';

export default function Dimensions() {
  const { t } = useTranslation();
  const scale = useStore(state => state.scale);
  const setScale = useStore(state => state.setScale);
  const wallThickness = useStore((state) => state.wallThickness);
  const setWallThickness = useStore((state) => state.setWallThickness);

  const roomResizer = (e, axis) => {
    const val = e.target.value;
    const newScale = { ...scale, [axis]: Number(val) };
    setScale(newScale);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setWallThickness(Number(val));
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      flexWrap="wrap"
    >
      <Grid container spacing={2} p={2}>
        <Grid xs={12}>
          <RangeInput
            label={t('width')}
            min={1}
            max={10}
            step={0.1}
            id="scaleX"
            onChange={(e) => {roomResizer(e, 'x')}}
            value={scale.x}
          />
        </Grid>
        <Grid xs={12}>
          <RangeInput
            label={t('height')}
            min={1}
            max={10}
            step={0.1}
            id="scaleY"
            onChange={(e) => {roomResizer(e, 'y')}}
            value={scale.y}
          />
        </Grid>
        <Grid xs={12}>
          <RangeInput
            label={t('depth')}
            min={1}
            max={10}
            step={0.1}
            id="scaleZ"
            onChange={(e) => {roomResizer(e, 'z')}}
            value={scale.z}
          />
        </Grid>
        <Grid xs={12}>
          <RangeInput
            label={t('thickness')}
            min={0.2}
            max={5}
            step={0.1}
            id="wallThicknessRange"
            onChange={handleChange}
            value={wallThickness}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
