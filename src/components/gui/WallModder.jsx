import useStore from '../../store/useStore';
import {AccordionDetails, AccordionSummary, Accordion, Box, FormControlLabel, FormGroup, Switch, Typography} from '@mui/material';
import RangeInput from './RangeInput';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function WallModder({
  title,
  isExpanded,
  handleChange,
}) {
  const wallThickness = useStore((state) => state.wallThickness);
  const holedWalls = useStore((state) => state.holedWalls);
  const updateHole = useStore((state) => state.updateHole);
  const roomSize = useStore((state) => state.roomSize());

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
    <>
      <Accordion expanded={isExpanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          {`${title} - Hole Width`}
        </AccordionSummary>
        <AccordionDetails>
          <Box
            display="flex"
            flexWrap="wrap"
            gap={2}
          >
            {/*<Typography*/}
            {/*  variant="subtitle1"*/}
            {/*  sx={{*/}
            {/*    width: '100%',*/}
            {/*  }}*/}
            {/*>*/}
            {/*  Hole width section*/}
            {/*</Typography>*/}
            {holedWalls.map((w, inx) => {
              return (
                <RangeInput
                  key={`${inx}_${w}_key`}
                  id={`${w.name}_hw`}
                  label={`${w.name}`}
                  min={0.2}
                  max={(w.name.includes('red') || w.name.includes('blue')) ? roomSize.width - 1 : roomSize.depth - 1}
                  step={0.1}
                  onChange={(e) => handleWallChange(e, w, 'w')}
                  value={w.width}
                  boxStyles={{
                    flex: '0 0 100%',
                    maxWidth: '100%',
                  }}
                />
              )
            })}
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={isExpanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          {`${title} - Hole Position`}
        </AccordionSummary>
        <AccordionDetails>
          <Box
            display="flex"
            flexWrap="wrap"
            gap={2}
          >
            {/*<Typography*/}
            {/*  variant="subtitle1"*/}
            {/*  sx={{*/}
            {/*    width: '100%',*/}
            {/*  }}*/}
            {/*>*/}
            {/*  Hole position section*/}
            {/*</Typography>*/}
            {holedWalls.map((w, inx) => {
              const min = w.name.includes('red' || 'blue') ?
                -(roomSize.width / 2) + (w.width / 2) + wallThickness :
                -(roomSize.depth / 2) + (w.width / 2) + wallThickness
              ;
              const max = w.name.includes('red' || 'blue') ?
                (roomSize.width / 2) - (w.width / 2) - wallThickness :
                (roomSize.depth / 2) - (w.width / 2) - wallThickness
              ;
              return (
                <RangeInput
                  key={`${inx}_${w}_key`}
                  id={`${w.name}_hp`}
                  label={`${w.name}`}
                  min={min}
                  max={max}
                  step={0.001}
                  onChange={(e) => handleWallChange(e, w, 'p')}
                  value={w.position}
                  boxStyles={{
                    flex: '0 0 100%',
                    maxWidth: '100%',
                  }}
                />
              )
            })}
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={isExpanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          {`${title} - Hole Glass insert`}
        </AccordionSummary>
        <AccordionDetails>
          <Box
            display="flex"
            alignItems="center"
            width="100%"
          >
            <FormGroup sx={{
              flexDirection: 'row',
              width: '100%',
              gap: 2
            }}>
              {/*<Typography*/}
              {/*  variant="subtitle1"*/}
              {/*  sx={{*/}
              {/*    width: '100%',*/}
              {/*  }}*/}
              {/*>*/}
              {/*  Hole glass door insert section*/}
              {/*</Typography>*/}
              {holedWalls.map((w, inx) => {
                return (
                  <FormControlLabel
                    key={`${inx}_${w}_key`}
                    control={
                      <Switch
                        onChange={(e) => handleWallChange(e, w, 'd')}
                        checked={w.door}
                      />
                    }
                    label={`${w.name}`}
                    sx={{
                      m: 0,
                      flex: '1 1 40%',
                      maxWidth: '48%',
                    }}
                  />
                )
              })}
            </FormGroup>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
 );
}
