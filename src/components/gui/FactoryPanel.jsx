import {Box, FormControl, FormControlLabel, FormGroup, InputLabel, NativeSelect, Switch} from '@mui/material';
import { useTranslation } from 'react-i18next';

import useStore from 'store/useStore';

export default function FactoryPanel() {
  const { t } = useTranslation();
  const factory = useStore((state) => state.factory);
  const setFactory = useStore((state) => state.setFactory);
  const model = useStore((state) => state.model);
  const setModel = useStore((state) => state.setModel);
  const furnitureResizer = useStore((state) => state.furnitureResizer);
  const setFurnitureResizer = useStore((state) => state.setFurnitureResizer);

  const handleFactoryChange = (e) => {
    setFactory(e.target.checked);
  }

  const handleResizerChange = (e) => {
    setFurnitureResizer(e.target.checked);
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      // my={2}
      p={2}
      gap={2}
      flexWrap="wrap"
    >
      <Box
        width="100%"
      >
        <FormControl fullWidth>
          <InputLabel htmlFor="furnitureSelect">{t('selectFurniture')}</InputLabel>
          <NativeSelect
            inputProps={{
              onChange: e => setModel(e.target.value),
              id: 'furnitureSelect',
              value: model,
            }}
          >
            <option value="chair">{t('chair')}</option>
            <option value="cabinet">{t('cabinet')}</option>
            <option value="cabinet_width">{t('cabinetWidth')}</option>
            <option value="cabinet_allmorphs">{t('cabinetAll')}</option>
          </NativeSelect>
        </FormControl>
      </Box>
      <FormGroup sx={{
        // flexWrap: 'nowrap',
        // flexDirection: 'row',
        width: '100%',
      }}>
        <FormControlLabel
          control={
            <Switch
              onChange={handleFactoryChange}
              checked={factory}
            />
          }
          label={t('factoryToggle')}
          sx={{
            m: 0,
          }}
        />
        <FormControlLabel
          control={
            <Switch
              onChange={handleResizerChange}
              checked={furnitureResizer}
            />
          }
          label={t('resizerToggle')}
          sx={{
            m: 0,
          }}
        />
      </FormGroup>
    </Box>
  );
}
