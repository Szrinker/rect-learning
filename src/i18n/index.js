import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    resources: {
      'pl-PL': {
        translation: {
          'languageSwitcherLabel': 'Język',
          'dimensions': 'Wymiary',
          'factory': 'Fabryka',
          'wallModification': 'Modyfikacja ściany',
          'media': 'Media',
          'width': 'Szerokość',
          'height': 'Wysokość',
          'depth': 'Głębokość',
          'thickness': 'Grubość',
          'removeHole': 'Usuń otwór',
          'addHole': 'Dodaj otwór',
          'holeWidth': 'Szerokość otworu',
          'holePosition': 'Pozycja otworu',
          'holeGlassInsert': 'Szklana wstawka',
          'screenShoot': 'Zrób zdjęcie',
          'save': 'Zapisz',
          'pdfScreenShoot': 'Zrób zdjęcie do PDF',
          'showImages': 'Pokaż zdjęcia',
          'pdfCreate': 'Wygeneruj PDF',
          'pdfModalTitle': 'Zdjęcia do dokumentu PDF.',
          'pdfModalDescription': 'Lista zdjęć do dokumentu PDF.',
          'selectFurniture': 'Wybierz mebel',
          'chair': 'Krzesło',
          'cabinet': 'Szafka',
          'cabinetWidth': 'Szafka morf szer',
          'cabinetAll': 'Szafka morf all',
          'factoryToggle': 'Włącz fabrykę',
          'resizerToggle': 'Włącz morfy',
          'contactModalTitle': '!! Profesjonalny twórca cel !!',
          'contactModalDescription': 'Wracaj do pudła.',
          'desk': 'Biurko',
          'deskToggle': 'Dodaj biurko',
          'deskHeight': 'Wysokość biurka',
        },
      },
      'en-US': {
        translation: {
          'languageSwitcherLabel': 'Language',
          'dimensions': 'Dimensions',
          'factory': 'Factory',
          'wallModification': 'Wall modification',
          'media': 'Media',
          'width': 'Width',
          'height': 'Height',
          'depth': 'Depth',
          'thickness': 'Thickness',
          'removeHole': 'Remove hole',
          'addHole': 'Add hole',
          'holeWidth': 'Hole Width',
          'holePosition': 'Hole Position',
          'holeGlassInsert': 'Hole Glass insert',
          'screenShoot': 'Screen shoot',
          'save': 'Save',
          'pdfScreenShoot': 'PDF ScreenShoot',
          'showImages': 'Show images',
          'pdfCreate': 'PDF Create',
          'pdfModalTitle': 'Images for PDF.',
          'pdfModalDescription': 'List of images inserted into PDF.',
          'selectFurniture': 'Select Furniture',
          'chair': 'Chair',
          'cabinet': 'Cabinet',
          'cabinetWidth': 'Cabinet width',
          'cabinetAll': 'Cabinet all',
          'factoryToggle': 'Enable Factory',
          'resizerToggle': 'Enable Resizer',
          'contactModalTitle': '!! Professional Cell maker !!',
          'contactModalDescription': 'You go to jail.',
          'desk': 'Desk',
          'deskToggle': 'Add desk',
          'deskHeight': 'Desk height',
        },
      }
    }
  })

export default i18n;
