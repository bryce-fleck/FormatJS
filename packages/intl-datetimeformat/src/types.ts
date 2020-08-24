import {
  LocaleData,
  DateTimeFormatLocaleInternalData,
} from '@formatjs/ecma402-abstract';

export interface PackedData {
  zones: string[];
  abbrvs: string;
  offsets: string;
}

export interface UnpackedData {
  zones: Record<string, ZoneData[]>;
  abbrvs: string[];
  /**
   * Offset in seconds, base 36
   */
  offsets: number[];
}

export type ZoneData = [
  // Seconds from UTC Time, empty string if NULL
  number | string,
  // Index of abbreviation in abbrvs like EST/EDT
  number,
  // Index of offsets in seconds
  number,
  // Whether it's daylight, 0|1
  number
];

export type RawDateTimeLocaleData = LocaleData<RawDateTimeLocaleInternalData>;

export type RawDateTimeLocaleInternalData = Omit<
  DateTimeFormatLocaleInternalData,
  'dateFormat' | 'timeFormat' | 'dateTimeFormat' | 'formats'
> & {
  formats: Record<string, Record<string, string>>;
  dateFormat: {full: string; long: string; medium: string; short: string};
  timeFormat: {full: string; long: string; medium: string; short: string};
  dateTimeFormat: {
    full: string;
    long: string;
    medium: string;
    short: string;
  };
};

export type TimeZoneNameData = Record<
  string,
  {
    long?: [string, string];
    short?: [string, string];
  }
>;
