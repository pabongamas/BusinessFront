export type Colors =
  | 'yellow'
  | 'green'
  | 'red'
  | 'violet'
  | 'gray'
  | 'vivid_sky_blue'
  | 'primary'
  | 'danger'
  | 'light'
  | 'sky';

export type ObjColors = Record<string, Record<string, boolean>>;
export const COLORS: ObjColors = {
  vivid_sky_blue: {
    'bg-vivid_sky_blue': true,
    'hover:bg-federal_blue-300': true,
    'hover:bg-federal_blue-400': true,
    'text-federal_blue': true,
  },
  primary: {
    'bg-primary-700': true,
    'hover:bg-primary-800': true,
    'focus:ring-primary-300': true,
    'text-white': true,
  },
  danger: {
    'bg-danger-700': true,
    'hover:bg-danger-800': true,
    'focus:ring-danger-300': true,
    'text-white': true,
  },
  light: {
    'bg-gray-200': true,
    'hover:bg-gray-500': true,
    'focus:ring-gray-50': true,
    'text-gray-700': true,
  },
  sky: {
    'bg-sky-700': true,
    'hover:bg-sky-800': true,
    'focus:ring-sky-300': true,
    'text-white': true,
  },
  yellow: {
    'bg-yellow-700': true,
    'hover:bg-yellow-800': true,
    'text-white': true,
  },
  green: {
    'bg-green-700': true,
    'hover:bg-green-800': true,
    'text-white': true,
  },
  red: { 'bg-red-700': true, 'hover:bg-red-800': true, 'text-white': true },
  violet: {
    'bg-violet-700': true,
    'hover:bg-violet-800': true,
    'text-white': true,
  },
  gray: { 'bg-gray-700': true, 'hover:bg-gray-800': true, 'text-white': true },
};
export const COLORSNOACTION: ObjColors = {
  vivid_sky_blue: {
    'bg-vivid_sky_blue': true,
    'text-federal_blue': true,
  },
};
export const COLORS_FOR_BUTTONS: ObjColors = {
  primaryBorder: {
    'bg-white': true,
    'border-2 border-honolulu_blue hover:bg-honolulu_blue-900 rounded-full':
      true,
  },
  warningBorder: {
    'bg-white': true,
    'border-2 border-federal_blue hover:bg-federal_blue-900 rounded-full': true,
  },
  secondaryBorder: {
    'bg-white': true,
    'border-2 border-marian_blue hover:bg-marian_blue-900 rounded-full': true,
  },
  primary: {
    'text-honolulu_blue': true,
    'border-honolulu_blue-900 bg-honolulu_blue-900  rounded': true,
  },
};
