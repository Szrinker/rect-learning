import { Box, Slider, Typography } from '@mui/material';

export default function RangeInput({
  label = 'label',
  min = 0,
  max = 10,
  step = 1,
  onChange,
  value,
  id,
  boxStyles,
}) {

  return (
    <Box className="slider-container" {...boxStyles}>
      <Typography variant="subtitle1" component="label" id={`${id}_label`} gutterBottom>
        {label}: {value}
      </Typography>
      <Slider
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        value={value}
        aria-labelledby={`${id}_label`}
      />
    </Box>
  );
}
