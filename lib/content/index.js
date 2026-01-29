import ayurveda from '../../content/data/ayurveda.json';
import yoga from '../../content/data/yoga.json';
import chakraEnergy from '../../content/data/chakra-energy.json';
import crystals from '../../content/data/crystals.json';

export const contentLibrary = {
  ayurveda,
  yoga,
  'chakra-energy': chakraEnergy,
  crystals,
};

export function getContentBySlug(slug) {
  return contentLibrary[slug] || null;
}
