'use client';

import { usePathname } from 'next/navigation';

const FIXED_PAIRS = [
  { match: '/', images: ['hero-background.jpg', 'paradise-flower.jpg'] },
];

const PLANT_IMAGES = [
  'daffodil.jpg',
  'daff-3.jpg',
  'wellness.jpg',
  'tea-set.jpg',
  'hero-background.jpg',
  'paradise-flower.jpg',
  'orchid-1.jpg',
  'ivy-wall.jpg',
  'succulent-side.jpg',
];

function hashString(input) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getPair(pathname) {
  const normalized = pathname || '/';
  const fixed = FIXED_PAIRS.find((entry) =>
    entry.match === '/'
      ? normalized === '/'
      : normalized.startsWith(entry.match)
  );
  if (fixed) return fixed.images;

  const seedA = hashString(normalized);
  const seedB = hashString(`${normalized}-alt`);
  const first = PLANT_IMAGES[seedA % PLANT_IMAGES.length];
  let second = PLANT_IMAGES[seedB % PLANT_IMAGES.length];

  if (second === first) {
    second = PLANT_IMAGES[(seedB + 3) % PLANT_IMAGES.length];
  }

  return [first, second];
}

export default function PagePlantShell({ children }) {
  const pathname = usePathname();
  const [plant1, plant2] = getPair(pathname);

  return (
    <div
      style={{
        '--plant-image-1': `url('/images/${plant1}')`,
        '--plant-image-2': `url('/images/${plant2}')`,
      }}
    >
      {children}
    </div>
  );
}
