import React from 'react';
import RangeInput from './gui/RangeInput';

export default function Panel() {
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
          label="Scale Z"
          min={1}
          max={10}
          step={0.1}
          // id="scaleY"
          axis="z"
        />
      </div>
    </div>
  );
}
