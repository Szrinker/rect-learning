import { useState } from 'react';
import useStore from '../store/useStore';
import RangeInput from './gui/RangeInput';

export default function Panel() {
  const wallThickness = useStore((state) => state.wallThickness);
  const setWallThickness = useStore((state) => state.setWallThickness);
  const factory = useStore((state) => state.factory);
  const setFactory = useStore((state) => state.setFactory);
  const furnitureResizer = useStore((state) => state.furnitureResizer);
  const setFurnitureResizer = useStore((state) => state.setFurnitureResizer);
  const model = useStore((state) => state.model);
  const setModel = useStore((state) => state.setModel);
  const [value, setValue] = useState(wallThickness);
  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
    setWallThickness(Number(val));
  };
  const handleFactoryChange = (e) => {
    setFactory(e.target.checked);
  }

  const handleResizerChange = (e) => {
    setFurnitureResizer(e.target.checked);
  }

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

        <div className="slider-container">
          <select
            value={model}
            onChange={e => setModel(e.target.value)}
          >
            <option value="chair">Chair</option>
            <option value="cabinet">Cabinet</option>
            <option value="cabinet_width">Cabinet width</option>
            <option value="cabinet_allmorphs">Cabinet all</option>
          </select>
        </div>
        <div className="slider-container">
          <label htmlFor="factory">Enable Factory</label>
          <input
            id="factory"
            type="checkbox"
            onChange={handleFactoryChange}
            checked={factory}
          />
        </div>
        <div className="slider-container">
          <label htmlFor="resizer">Enable Resizer</label>
          <input
            id="resizer"
            type="checkbox"
            onChange={handleResizerChange}
            checked={furnitureResizer}
          />
        </div>
      </div>
    </div>
  );
}
