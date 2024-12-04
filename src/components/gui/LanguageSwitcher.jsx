import { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  ButtonGroup,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';


const lngs = {
  'pl-PL': { label: 'PL' },
  'en-US': { label: 'EN' },
};

function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const { language, setLanguage } = useState('en-US');

  const handleChange = (e) => {
    const { target: { value } } = e;
    setLanguage(value);
    i18n.changeLanguage(value);
  }

  return (
    <Suspense>
      <Box>
        {/*<FormControl fullWidth>*/}
        {/*  <InputLabel id="languageSwitcherLabel">*/}
        {/*    {t('languageSwitcherLabel')}*/}
        {/*  </InputLabel>*/}
        {/*  <Select*/}
        {/*    labelId="languageSwitcherLabel"*/}
        {/*    id="languageSwitcher"*/}
        {/*    value={language}*/}
        {/*    label="Language"*/}
        {/*    onChange={handleChange}*/}
        {/*  >*/}
        {/*    {Object.keys(lngs).map((lng) => {*/}
        {/*      <MenuItem*/}
        {/*        value={lng}*/}
        {/*        key={lng}*/}
        {/*      >*/}
        {/*        {lngs[lng].label}*/}
        {/*      </MenuItem>*/}
        {/*    })}*/}
        {/*  </Select>*/}
        {/*</FormControl>*/}
        <Box
          className="language-switcher"
          key="lang-switcher"
          display="flex"
          p={2}
          gap={2}
          flexWrap="nowrap"
          flexDirection="column"
        >
          <InputLabel>{t('languageSwitcherLabel')}</InputLabel>
          <ButtonGroup
            color="secondary"
          >
            {Object.keys(lngs)
            .map((lng) => (
              <Button
                key={lng}
                color={i18n.resolvedLanguage === lng ? 'primary' : 'secondary'}
                variant="contained"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  i18n.changeLanguage(lng);
                }}
              >
                {lngs[lng].label}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </Box>
    </Suspense>
  );
}

export default LanguageSwitcher;
