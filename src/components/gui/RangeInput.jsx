import { useState, useId } from 'react';
import useStore from '../../store/useStore';

export default function RangeInput({
  label = 'label',
  min = 0,
  max = 10,
  step = 1,
  axis = null,
}) {
  const id = useId();
  const scale = useStore(state => state.scale);
  const setScale = useStore(state => state.setScale);

  const onChange = (e) => {
    const val = e.target.value;
    const newScale = { ...scale, [axis]: Number(val) };
    setScale(newScale);
  };

  return (
    <>
      <div className="slider-container">
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          onChange={onChange}
          value={scale[axis]}
        />
        <p>Value: {scale[axis]}</p>
      </div>
    </>
  );
}
