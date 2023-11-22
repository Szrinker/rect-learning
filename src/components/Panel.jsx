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
  const holedWalls = useStore((state) => state.holedWalls);
  const updateHole = useStore((state) => state.updateHole);
  const roomSize = useStore((state) => state.roomSize());

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

  const handleWallChange = (e, wall, type) => {
    if (type === 'w') {
      wall.width = e.target.value;
      updateHole(wall);
    } else if (type === 'd') {
      wall.door = e.target.checked;
      updateHole(wall)
    } else if (type === 'p') {
      wall.position = e.target.value;
      updateHole(wall);
    }
  }

  return (
    <div className="panel">
      <div className="inputs-wrapper">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
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
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
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

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
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

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {holedWalls.map((w) => {
            return (
              <div className="slider-container" key={`${w.name}_hw`}>
                <label htmlFor={`${w.name}_hw`}>{`${w.name} hole width`}</label>
                <input
                  id={`${w.name}_hw`}
                  type="range"
                  step="0.1"
                  min="0.5"
                  max={w.name.includes('red' || 'blue') ? roomSize.width : roomSize.depth}
                  onChange={(e) => handleWallChange(e, w, 'w')}
                  defaultValue={w.width}
                />
              </div>
            )
            })}
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {holedWalls.map((w) => {
            const min = w.name.includes('red' || 'blue') ?
              -(roomSize.width / 2) + (w.width/2) + wallThickness :
              -(roomSize.depth / 2) + (w.width/2) + wallThickness
            ;

            const max = w.name.includes('red' || 'blue') ?
              (roomSize.width / 2) - (w.width/2) - wallThickness :
              (roomSize.depth / 2) - (w.width/2) - wallThickness
            ;


            return (
              <div className="slider-container" key={`${w.name}_hp`}>
                <label htmlFor={`${w.name}_hp`}>{`${w.name} hole position`}</label>
                <input
                  id={`${w.name}_hp`}
                  type="range"
                  step="0.001"
                  min={min}
                  max={max}
                  onChange={(e) => handleWallChange(e, w, 'p')}
                  defaultValue={w.position}
                />
              </div>
            )
          })}
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {holedWalls.map((w) => {
            return (
              <div className="slider-container" key={`${w.name}_hd`}>
                <label htmlFor={`${w.name}_hd`}>{`${w.name} hole door`}</label>
                <input
                  id={`${w.name}_hd`}
                  type="checkbox"
                  onChange={(e) => handleWallChange(e, w, 'd')}
                  checked={w.door}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
