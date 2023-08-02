import { useState } from 'react';
import useStore from '../store/useStore';
import RangeInput from './gui/RangeInput';

export default function Panel() {
  const wallThickness = useStore((state) => state.wallThickness);
  const setWallThickness = useStore((state) => state.setWallThickness);
  const [value, setValue] = useState(wallThickness);
  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
    setWallThickness(Number(val));
  };

  return (
    <div className="panel">
      <div className="inputs-wrapper">
        <RangeInput
          label="Scale X"
          min={1}
          max={10}
          step={0.1}
          // id="scaleX"
          axis="x"
        />
        <RangeInput
          label="Scale Y"
          min={1}
          max={10}
          step={0.1}
          // id="scaleY"
          axis="y"
        />
        <RangeInput
          label="Scale Z"
          min={1}
          max={10}
          step={0.1}
          // id="scaleY"
          axis="z"
        />
        <div className="slider-container">
          <label htmlFor="wallThicknessRange">Wall Thickness</label>
          <input
            id="wallThicknessRange"
            type="range"
            min={0.2}
            max={5}
            step={0.1}
            onChange={handleChange}
            value={value}
          />
          <p>Value: {value}</p>
        </div>
      </div>
    </div>
  );
}
