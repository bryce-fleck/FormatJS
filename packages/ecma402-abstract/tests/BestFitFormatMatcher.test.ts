import {
  bestFitFormatMatcherScore,
  BestFitFormatMatcher,
} from '../DateTimeFormat/BestFitFormatMatcher';
import {parseDateTimeSkeleton} from '../DateTimeFormat/skeleton';
import {DateTimeFormatOptions} from '../types/date-time';

test('bestFitFormatMatcherScore', function () {
  const opts: DateTimeFormatOptions = {
    weekday: 'short',
    era: 'short',
    year: '2-digit',
    month: 'narrow',
    day: '2-digit',
    hour: '2-digit',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'America/Los_Angeles',
    timeZoneName: 'short',
    hour12: true,
  };
  expect(
    bestFitFormatMatcherScore(opts, parseDateTimeSkeleton('h:mm:ss a v'))
  ).toBeGreaterThan(
    bestFitFormatMatcherScore(opts, parseDateTimeSkeleton('HH:mm:ss v'))
  );
});
test('BestFitFormatMatcher second tz', function () {
  const availableFormats = {
    'h:mm:ss a zzzz': 'h:mm:ss a zzzz',
    'h:mm:ss a z': 'h:mm:ss a z',
    h: 'h a',
    H: 'HH',
    hm: 'h:mm a',
    Hm: 'HH:mm',
    hms: 'h:mm:ss a',
    Hms: 'HH:mm:ss',
    hmsv: 'h:mm:ss a v',
    Hmsv: 'HH:mm:ss v',
    hmv: 'h:mm a v',
    Hmv: 'HH:mm v',
  };
  expect(
    BestFitFormatMatcher(
      {
        year: undefined,
        month: undefined,
        day: undefined,
        hour: '2-digit',
        minute: '2-digit',
        second: undefined,
        timeZoneName: 'short',
        hour12: true,
      },
      Object.keys(availableFormats).map(k =>
        parseDateTimeSkeleton(k, availableFormats[k as 'h'])
      )
    )
  ).toEqual({
    hour: '2-digit',
    hour12: true,
    minute: '2-digit',
    pattern: '{hour}:{minute} {timeZoneName}',
    pattern12: '{hour}:{minute} {ampm} {timeZoneName}',
    rawPattern: 'h:mm a v',
    skeleton: 'hmv',
    timeZoneName: 'short',
    rangePatterns: {},
    rangePatterns12: {},
  });
});
test('bestFitFormatMatcherScore second tz', function () {
  const opts: DateTimeFormatOptions = {
    year: undefined,
    month: undefined,
    day: undefined,
    hour: '2-digit',
    minute: '2-digit',
    second: undefined,
    timeZoneName: 'short',
    hour12: true,
  };
  expect(
    bestFitFormatMatcherScore(opts, parseDateTimeSkeleton('hmv', 'h:mm a v'))
  ).toBeGreaterThan(
    bestFitFormatMatcherScore(
      opts,
      parseDateTimeSkeleton('h:mm:ss a z', 'h:mm:ss a z')
    )
  );
});
test('bestFitFormatMatcherScore long weekday (ko)', function () {
  const opts: DateTimeFormatOptions = {
    weekday: 'long',
    era: 'short',
    year: '2-digit',
    month: 'narrow',
    day: '2-digit',
    hour: '2-digit',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
    hour12: true,
  };
  expect(
    bestFitFormatMatcherScore(
      opts,
      parseDateTimeSkeleton('G y년 MMM d일 EEEE a h시 m분 s초 z')
    )
  ).toBeGreaterThan(
    bestFitFormatMatcherScore(
      opts,
      parseDateTimeSkeleton('G y년 MMM d일 (E) a h시 m분 s초 z')
    )
  );
});
test('bestFitFormatMatcherScore narrow weekday (ko)', function () {
  const opts: DateTimeFormatOptions = {
    weekday: 'short',
    era: 'short',
    year: '2-digit',
    month: 'narrow',
    day: '2-digit',
    hour: '2-digit',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
    hour12: true,
  };
  expect(
    bestFitFormatMatcherScore(
      opts,
      parseDateTimeSkeleton('G y년 MMM d일 (E) a h시 m분 s초 z')
    )
  ).toBeGreaterThan(
    bestFitFormatMatcherScore(
      opts,
      parseDateTimeSkeleton('G y년 MMM d일 EEEE a h시 m분 s초 z')
    )
  );
});
const FORMATS = {
  Bh: 'Bh时',
  Bhm: 'Bh:mm',
  Bhms: 'Bh:mm:ss',
  d: 'd日',
  E: 'ccc',
  EBhm: 'EBh:mm',
  EBhms: 'EBh:mm:ss',
  Ed: 'd日E',
  Ehm: 'Eah:mm',
  EHm: 'EHH:mm',
  Ehms: 'Eah:mm:ss',
  EHms: 'EHH:mm:ss',
  Gy: 'Gy年',
  GyMMM: 'Gy年M月',
  GyMMMd: 'Gy年M月d日',
  GyMMMEd: 'Gy年M月d日E',
  h: 'ah时',
  H: 'H时',
  hm: 'ah:mm',
  Hm: 'HH:mm',
  hms: 'ah:mm:ss',
  Hms: 'HH:mm:ss',
  hmsv: 'v ah:mm:ss',
  Hmsv: 'v HH:mm:ss',
  hmv: 'v ah:mm',
  Hmv: 'v HH:mm',
  M: 'M月',
  Md: 'M/d',
  MEd: 'M/dE',
  MMdd: 'MM/dd',
  MMM: 'LLL',
  MMMd: 'M月d日',
  MMMEd: 'M月d日E',
  MMMMd: 'M月d日',
  ms: 'mm:ss',
  y: 'y年',
  yM: 'y年M月',
  yMd: 'y/M/d',
  yMEd: 'y/M/dE',
  yMM: 'y年M月',
  yMMM: 'y年M月',
  yMMMd: 'y年M月d日',
  yMMMEd: 'y年M月d日E',
  yMMMM: 'y年M月',
  y年M月d日EEEE: 'y年M月d日EEEE',
  y年M月d日: 'y年M月d日',
  'y/M/d': 'y/M/d',
  'zzzz ah:mm:ss': 'zzzz ah:mm:ss',
  'z ah:mm:ss': 'z ah:mm:ss',
  'ah:mm:ss': 'ah:mm:ss',
  'ah:mm': 'ah:mm',
  'y年M月d日EEEE zzzz ah:mm:ss': 'y年M月d日EEEE zzzz ah:mm:ss',
  'y年M月d日 zzzz ah:mm:ss': 'y年M月d日 zzzz ah:mm:ss',
  'y/M/d zzzz ah:mm:ss': 'y/M/d zzzz ah:mm:ss',
  'd zzzz ah:mm:ss': 'd日 zzzz ah:mm:ss',
  'E zzzz ah:mm:ss': 'ccc zzzz ah:mm:ss',
  'Ed zzzz ah:mm:ss': 'd日E zzzz ah:mm:ss',
  'Gy zzzz ah:mm:ss': 'Gy年 zzzz ah:mm:ss',
  'GyMMM zzzz ah:mm:ss': 'Gy年M月 zzzz ah:mm:ss',
  'GyMMMd zzzz ah:mm:ss': 'Gy年M月d日 zzzz ah:mm:ss',
  'GyMMMEd zzzz ah:mm:ss': 'Gy年M月d日E zzzz ah:mm:ss',
  'M zzzz ah:mm:ss': 'M月 zzzz ah:mm:ss',
  'Md zzzz ah:mm:ss': 'M/d zzzz ah:mm:ss',
  'MEd zzzz ah:mm:ss': 'M/dE zzzz ah:mm:ss',
  'MMdd zzzz ah:mm:ss': 'MM/dd zzzz ah:mm:ss',
  'MMM zzzz ah:mm:ss': 'LLL zzzz ah:mm:ss',
  'MMMd zzzz ah:mm:ss': 'M月d日 zzzz ah:mm:ss',
  'MMMEd zzzz ah:mm:ss': 'M月d日E zzzz ah:mm:ss',
  'MMMMd zzzz ah:mm:ss': 'M月d日 zzzz ah:mm:ss',
  'y zzzz ah:mm:ss': 'y年 zzzz ah:mm:ss',
  'yM zzzz ah:mm:ss': 'y年M月 zzzz ah:mm:ss',
  'yMd zzzz ah:mm:ss': 'y/M/d zzzz ah:mm:ss',
  'yMEd zzzz ah:mm:ss': 'y/M/dE zzzz ah:mm:ss',
  'yMM zzzz ah:mm:ss': 'y年M月 zzzz ah:mm:ss',
  'yMMM zzzz ah:mm:ss': 'y年M月 zzzz ah:mm:ss',
  'yMMMd zzzz ah:mm:ss': 'y年M月d日 zzzz ah:mm:ss',
  'yMMMEd zzzz ah:mm:ss': 'y年M月d日E zzzz ah:mm:ss',
  'yMMMM zzzz ah:mm:ss': 'y年M月 zzzz ah:mm:ss',
  'y年M月d日EEEE z ah:mm:ss': 'y年M月d日EEEE z ah:mm:ss',
  'y年M月d日 z ah:mm:ss': 'y年M月d日 z ah:mm:ss',
  'y/M/d z ah:mm:ss': 'y/M/d z ah:mm:ss',
  'd z ah:mm:ss': 'd日 z ah:mm:ss',
  'E z ah:mm:ss': 'ccc z ah:mm:ss',
  'Ed z ah:mm:ss': 'd日E z ah:mm:ss',
  'Gy z ah:mm:ss': 'Gy年 z ah:mm:ss',
  'GyMMM z ah:mm:ss': 'Gy年M月 z ah:mm:ss',
  'GyMMMd z ah:mm:ss': 'Gy年M月d日 z ah:mm:ss',
  'GyMMMEd z ah:mm:ss': 'Gy年M月d日E z ah:mm:ss',
  'M z ah:mm:ss': 'M月 z ah:mm:ss',
  'Md z ah:mm:ss': 'M/d z ah:mm:ss',
  'MEd z ah:mm:ss': 'M/dE z ah:mm:ss',
  'MMdd z ah:mm:ss': 'MM/dd z ah:mm:ss',
  'MMM z ah:mm:ss': 'LLL z ah:mm:ss',
  'MMMd z ah:mm:ss': 'M月d日 z ah:mm:ss',
  'MMMEd z ah:mm:ss': 'M月d日E z ah:mm:ss',
  'MMMMd z ah:mm:ss': 'M月d日 z ah:mm:ss',
  'y z ah:mm:ss': 'y年 z ah:mm:ss',
  'yM z ah:mm:ss': 'y年M月 z ah:mm:ss',
  'yMd z ah:mm:ss': 'y/M/d z ah:mm:ss',
  'yMEd z ah:mm:ss': 'y/M/dE z ah:mm:ss',
  'yMM z ah:mm:ss': 'y年M月 z ah:mm:ss',
  'yMMM z ah:mm:ss': 'y年M月 z ah:mm:ss',
  'yMMMd z ah:mm:ss': 'y年M月d日 z ah:mm:ss',
  'yMMMEd z ah:mm:ss': 'y年M月d日E z ah:mm:ss',
  'yMMMM z ah:mm:ss': 'y年M月 z ah:mm:ss',
  'y年M月d日EEEE ah:mm:ss': 'y年M月d日EEEE ah:mm:ss',
  'y年M月d日 ah:mm:ss': 'y年M月d日 ah:mm:ss',
  'y/M/d ah:mm:ss': 'y/M/d ah:mm:ss',
  'd ah:mm:ss': 'd日 ah:mm:ss',
  'E ah:mm:ss': 'ccc ah:mm:ss',
  'Ed ah:mm:ss': 'd日E ah:mm:ss',
  'Gy ah:mm:ss': 'Gy年 ah:mm:ss',
  'GyMMM ah:mm:ss': 'Gy年M月 ah:mm:ss',
  'GyMMMd ah:mm:ss': 'Gy年M月d日 ah:mm:ss',
  'GyMMMEd ah:mm:ss': 'Gy年M月d日E ah:mm:ss',
  'M ah:mm:ss': 'M月 ah:mm:ss',
  'Md ah:mm:ss': 'M/d ah:mm:ss',
  'MEd ah:mm:ss': 'M/dE ah:mm:ss',
  'MMdd ah:mm:ss': 'MM/dd ah:mm:ss',
  'MMM ah:mm:ss': 'LLL ah:mm:ss',
  'MMMd ah:mm:ss': 'M月d日 ah:mm:ss',
  'MMMEd ah:mm:ss': 'M月d日E ah:mm:ss',
  'MMMMd ah:mm:ss': 'M月d日 ah:mm:ss',
  'y ah:mm:ss': 'y年 ah:mm:ss',
  'yM ah:mm:ss': 'y年M月 ah:mm:ss',
  'yMd ah:mm:ss': 'y/M/d ah:mm:ss',
  'yMEd ah:mm:ss': 'y/M/dE ah:mm:ss',
  'yMM ah:mm:ss': 'y年M月 ah:mm:ss',
  'yMMM ah:mm:ss': 'y年M月 ah:mm:ss',
  'yMMMd ah:mm:ss': 'y年M月d日 ah:mm:ss',
  'yMMMEd ah:mm:ss': 'y年M月d日E ah:mm:ss',
  'yMMMM ah:mm:ss': 'y年M月 ah:mm:ss',
  'y年M月d日EEEE ah:mm': 'y年M月d日EEEE ah:mm',
  'y年M月d日 ah:mm': 'y年M月d日 ah:mm',
  'y/M/d ah:mm': 'y/M/d ah:mm',
  'd ah:mm': 'd日 ah:mm',
  'E ah:mm': 'ccc ah:mm',
  'Ed ah:mm': 'd日E ah:mm',
  'Gy ah:mm': 'Gy年 ah:mm',
  'GyMMM ah:mm': 'Gy年M月 ah:mm',
  'GyMMMd ah:mm': 'Gy年M月d日 ah:mm',
  'GyMMMEd ah:mm': 'Gy年M月d日E ah:mm',
  'M ah:mm': 'M月 ah:mm',
  'Md ah:mm': 'M/d ah:mm',
  'MEd ah:mm': 'M/dE ah:mm',
  'MMdd ah:mm': 'MM/dd ah:mm',
  'MMM ah:mm': 'LLL ah:mm',
  'MMMd ah:mm': 'M月d日 ah:mm',
  'MMMEd ah:mm': 'M月d日E ah:mm',
  'MMMMd ah:mm': 'M月d日 ah:mm',
  'y ah:mm': 'y年 ah:mm',
  'yM ah:mm': 'y年M月 ah:mm',
  'yMd ah:mm': 'y/M/d ah:mm',
  'yMEd ah:mm': 'y/M/dE ah:mm',
  'yMM ah:mm': 'y年M月 ah:mm',
  'yMMM ah:mm': 'y年M月 ah:mm',
  'yMMMd ah:mm': 'y年M月d日 ah:mm',
  'yMMMEd ah:mm': 'y年M月d日E ah:mm',
  'yMMMM ah:mm': 'y年M月 ah:mm',
  'y年M月d日EEEE Bh': 'y年M月d日EEEE Bh时',
  'y年M月d日 Bh': 'y年M月d日 Bh时',
  'y/M/d Bh': 'y/M/d Bh时',
  'd Bh': 'd日 Bh时',
  'E Bh': 'ccc Bh时',
  'Ed Bh': 'd日E Bh时',
  'Gy Bh': 'Gy年 Bh时',
  'GyMMM Bh': 'Gy年M月 Bh时',
  'GyMMMd Bh': 'Gy年M月d日 Bh时',
  'GyMMMEd Bh': 'Gy年M月d日E Bh时',
  'M Bh': 'M月 Bh时',
  'Md Bh': 'M/d Bh时',
  'MEd Bh': 'M/dE Bh时',
  'MMdd Bh': 'MM/dd Bh时',
  'MMM Bh': 'LLL Bh时',
  'MMMd Bh': 'M月d日 Bh时',
  'MMMEd Bh': 'M月d日E Bh时',
  'MMMMd Bh': 'M月d日 Bh时',
  'y Bh': 'y年 Bh时',
  'yM Bh': 'y年M月 Bh时',
  'yMd Bh': 'y/M/d Bh时',
  'yMEd Bh': 'y/M/dE Bh时',
  'yMM Bh': 'y年M月 Bh时',
  'yMMM Bh': 'y年M月 Bh时',
  'yMMMd Bh': 'y年M月d日 Bh时',
  'yMMMEd Bh': 'y年M月d日E Bh时',
  'yMMMM Bh': 'y年M月 Bh时',
  'y年M月d日EEEE Bhm': 'y年M月d日EEEE Bh:mm',
  'y年M月d日 Bhm': 'y年M月d日 Bh:mm',
  'y/M/d Bhm': 'y/M/d Bh:mm',
  'd Bhm': 'd日 Bh:mm',
  'E Bhm': 'ccc Bh:mm',
  'Ed Bhm': 'd日E Bh:mm',
  'Gy Bhm': 'Gy年 Bh:mm',
  'GyMMM Bhm': 'Gy年M月 Bh:mm',
  'GyMMMd Bhm': 'Gy年M月d日 Bh:mm',
  'GyMMMEd Bhm': 'Gy年M月d日E Bh:mm',
  'M Bhm': 'M月 Bh:mm',
  'Md Bhm': 'M/d Bh:mm',
  'MEd Bhm': 'M/dE Bh:mm',
  'MMdd Bhm': 'MM/dd Bh:mm',
  'MMM Bhm': 'LLL Bh:mm',
  'MMMd Bhm': 'M月d日 Bh:mm',
  'MMMEd Bhm': 'M月d日E Bh:mm',
  'MMMMd Bhm': 'M月d日 Bh:mm',
  'y Bhm': 'y年 Bh:mm',
  'yM Bhm': 'y年M月 Bh:mm',
  'yMd Bhm': 'y/M/d Bh:mm',
  'yMEd Bhm': 'y/M/dE Bh:mm',
  'yMM Bhm': 'y年M月 Bh:mm',
  'yMMM Bhm': 'y年M月 Bh:mm',
  'yMMMd Bhm': 'y年M月d日 Bh:mm',
  'yMMMEd Bhm': 'y年M月d日E Bh:mm',
  'yMMMM Bhm': 'y年M月 Bh:mm',
  'y年M月d日EEEE Bhms': 'y年M月d日EEEE Bh:mm:ss',
  'y年M月d日 Bhms': 'y年M月d日 Bh:mm:ss',
  'y/M/d Bhms': 'y/M/d Bh:mm:ss',
  'd Bhms': 'd日 Bh:mm:ss',
  'E Bhms': 'ccc Bh:mm:ss',
  'Ed Bhms': 'd日E Bh:mm:ss',
  'Gy Bhms': 'Gy年 Bh:mm:ss',
  'GyMMM Bhms': 'Gy年M月 Bh:mm:ss',
  'GyMMMd Bhms': 'Gy年M月d日 Bh:mm:ss',
  'GyMMMEd Bhms': 'Gy年M月d日E Bh:mm:ss',
  'M Bhms': 'M月 Bh:mm:ss',
  'Md Bhms': 'M/d Bh:mm:ss',
  'MEd Bhms': 'M/dE Bh:mm:ss',
  'MMdd Bhms': 'MM/dd Bh:mm:ss',
  'MMM Bhms': 'LLL Bh:mm:ss',
  'MMMd Bhms': 'M月d日 Bh:mm:ss',
  'MMMEd Bhms': 'M月d日E Bh:mm:ss',
  'MMMMd Bhms': 'M月d日 Bh:mm:ss',
  'y Bhms': 'y年 Bh:mm:ss',
  'yM Bhms': 'y年M月 Bh:mm:ss',
  'yMd Bhms': 'y/M/d Bh:mm:ss',
  'yMEd Bhms': 'y/M/dE Bh:mm:ss',
  'yMM Bhms': 'y年M月 Bh:mm:ss',
  'yMMM Bhms': 'y年M月 Bh:mm:ss',
  'yMMMd Bhms': 'y年M月d日 Bh:mm:ss',
  'yMMMEd Bhms': 'y年M月d日E Bh:mm:ss',
  'yMMMM Bhms': 'y年M月 Bh:mm:ss',
  'y年M月d日EEEE h': 'y年M月d日EEEE ah时',
  'y年M月d日 h': 'y年M月d日 ah时',
  'y/M/d h': 'y/M/d ah时',
  'd h': 'd日 ah时',
  'E h': 'ccc ah时',
  'Ed h': 'd日E ah时',
  'Gy h': 'Gy年 ah时',
  'GyMMM h': 'Gy年M月 ah时',
  'GyMMMd h': 'Gy年M月d日 ah时',
  'GyMMMEd h': 'Gy年M月d日E ah时',
  'M h': 'M月 ah时',
  'Md h': 'M/d ah时',
  'MEd h': 'M/dE ah时',
  'MMdd h': 'MM/dd ah时',
  'MMM h': 'LLL ah时',
  'MMMd h': 'M月d日 ah时',
  'MMMEd h': 'M月d日E ah时',
  'MMMMd h': 'M月d日 ah时',
  'y h': 'y年 ah时',
  'yM h': 'y年M月 ah时',
  'yMd h': 'y/M/d ah时',
  'yMEd h': 'y/M/dE ah时',
  'yMM h': 'y年M月 ah时',
  'yMMM h': 'y年M月 ah时',
  'yMMMd h': 'y年M月d日 ah时',
  'yMMMEd h': 'y年M月d日E ah时',
  'yMMMM h': 'y年M月 ah时',
  'y年M月d日EEEE H': 'y年M月d日EEEE H时',
  'y年M月d日 H': 'y年M月d日 H时',
  'y/M/d H': 'y/M/d H时',
  'd H': 'd日 H时',
  'E H': 'ccc H时',
  'Ed H': 'd日E H时',
  'Gy H': 'Gy年 H时',
  'GyMMM H': 'Gy年M月 H时',
  'GyMMMd H': 'Gy年M月d日 H时',
  'GyMMMEd H': 'Gy年M月d日E H时',
  'M H': 'M月 H时',
  'Md H': 'M/d H时',
  'MEd H': 'M/dE H时',
  'MMdd H': 'MM/dd H时',
  'MMM H': 'LLL H时',
  'MMMd H': 'M月d日 H时',
  'MMMEd H': 'M月d日E H时',
  'MMMMd H': 'M月d日 H时',
  'y H': 'y年 H时',
  'yM H': 'y年M月 H时',
  'yMd H': 'y/M/d H时',
  'yMEd H': 'y/M/dE H时',
  'yMM H': 'y年M月 H时',
  'yMMM H': 'y年M月 H时',
  'yMMMd H': 'y年M月d日 H时',
  'yMMMEd H': 'y年M月d日E H时',
  'yMMMM H': 'y年M月 H时',
  'y年M月d日EEEE hm': 'y年M月d日EEEE ah:mm',
  'y年M月d日 hm': 'y年M月d日 ah:mm',
  'y/M/d hm': 'y/M/d ah:mm',
  'd hm': 'd日 ah:mm',
  'E hm': 'ccc ah:mm',
  'Ed hm': 'd日E ah:mm',
  'Gy hm': 'Gy年 ah:mm',
  'GyMMM hm': 'Gy年M月 ah:mm',
  'GyMMMd hm': 'Gy年M月d日 ah:mm',
  'GyMMMEd hm': 'Gy年M月d日E ah:mm',
  'M hm': 'M月 ah:mm',
  'Md hm': 'M/d ah:mm',
  'MEd hm': 'M/dE ah:mm',
  'MMdd hm': 'MM/dd ah:mm',
  'MMM hm': 'LLL ah:mm',
  'MMMd hm': 'M月d日 ah:mm',
  'MMMEd hm': 'M月d日E ah:mm',
  'MMMMd hm': 'M月d日 ah:mm',
  'y hm': 'y年 ah:mm',
  'yM hm': 'y年M月 ah:mm',
  'yMd hm': 'y/M/d ah:mm',
  'yMEd hm': 'y/M/dE ah:mm',
  'yMM hm': 'y年M月 ah:mm',
  'yMMM hm': 'y年M月 ah:mm',
  'yMMMd hm': 'y年M月d日 ah:mm',
  'yMMMEd hm': 'y年M月d日E ah:mm',
  'yMMMM hm': 'y年M月 ah:mm',
  'y年M月d日EEEE Hm': 'y年M月d日EEEE HH:mm',
  'y年M月d日 Hm': 'y年M月d日 HH:mm',
  'y/M/d Hm': 'y/M/d HH:mm',
  'd Hm': 'd日 HH:mm',
  'E Hm': 'ccc HH:mm',
  'Ed Hm': 'd日E HH:mm',
  'Gy Hm': 'Gy年 HH:mm',
  'GyMMM Hm': 'Gy年M月 HH:mm',
  'GyMMMd Hm': 'Gy年M月d日 HH:mm',
  'GyMMMEd Hm': 'Gy年M月d日E HH:mm',
  'M Hm': 'M月 HH:mm',
  'Md Hm': 'M/d HH:mm',
  'MEd Hm': 'M/dE HH:mm',
  'MMdd Hm': 'MM/dd HH:mm',
  'MMM Hm': 'LLL HH:mm',
  'MMMd Hm': 'M月d日 HH:mm',
  'MMMEd Hm': 'M月d日E HH:mm',
  'MMMMd Hm': 'M月d日 HH:mm',
  'y Hm': 'y年 HH:mm',
  'yM Hm': 'y年M月 HH:mm',
  'yMd Hm': 'y/M/d HH:mm',
  'yMEd Hm': 'y/M/dE HH:mm',
  'yMM Hm': 'y年M月 HH:mm',
  'yMMM Hm': 'y年M月 HH:mm',
  'yMMMd Hm': 'y年M月d日 HH:mm',
  'yMMMEd Hm': 'y年M月d日E HH:mm',
  'yMMMM Hm': 'y年M月 HH:mm',
  'y年M月d日EEEE hms': 'y年M月d日EEEE ah:mm:ss',
  'y年M月d日 hms': 'y年M月d日 ah:mm:ss',
  'y/M/d hms': 'y/M/d ah:mm:ss',
  'd hms': 'd日 ah:mm:ss',
  'E hms': 'ccc ah:mm:ss',
  'Ed hms': 'd日E ah:mm:ss',
  'Gy hms': 'Gy年 ah:mm:ss',
  'GyMMM hms': 'Gy年M月 ah:mm:ss',
  'GyMMMd hms': 'Gy年M月d日 ah:mm:ss',
  'GyMMMEd hms': 'Gy年M月d日E ah:mm:ss',
  'M hms': 'M月 ah:mm:ss',
  'Md hms': 'M/d ah:mm:ss',
  'MEd hms': 'M/dE ah:mm:ss',
  'MMdd hms': 'MM/dd ah:mm:ss',
  'MMM hms': 'LLL ah:mm:ss',
  'MMMd hms': 'M月d日 ah:mm:ss',
  'MMMEd hms': 'M月d日E ah:mm:ss',
  'MMMMd hms': 'M月d日 ah:mm:ss',
  'y hms': 'y年 ah:mm:ss',
  'yM hms': 'y年M月 ah:mm:ss',
  'yMd hms': 'y/M/d ah:mm:ss',
  'yMEd hms': 'y/M/dE ah:mm:ss',
  'yMM hms': 'y年M月 ah:mm:ss',
  'yMMM hms': 'y年M月 ah:mm:ss',
  'yMMMd hms': 'y年M月d日 ah:mm:ss',
  'yMMMEd hms': 'y年M月d日E ah:mm:ss',
  'yMMMM hms': 'y年M月 ah:mm:ss',
  'y年M月d日EEEE Hms': 'y年M月d日EEEE HH:mm:ss',
  'y年M月d日 Hms': 'y年M月d日 HH:mm:ss',
  'y/M/d Hms': 'y/M/d HH:mm:ss',
  'd Hms': 'd日 HH:mm:ss',
  'E Hms': 'ccc HH:mm:ss',
  'Ed Hms': 'd日E HH:mm:ss',
  'Gy Hms': 'Gy年 HH:mm:ss',
  'GyMMM Hms': 'Gy年M月 HH:mm:ss',
  'GyMMMd Hms': 'Gy年M月d日 HH:mm:ss',
  'GyMMMEd Hms': 'Gy年M月d日E HH:mm:ss',
  'M Hms': 'M月 HH:mm:ss',
  'Md Hms': 'M/d HH:mm:ss',
  'MEd Hms': 'M/dE HH:mm:ss',
  'MMdd Hms': 'MM/dd HH:mm:ss',
  'MMM Hms': 'LLL HH:mm:ss',
  'MMMd Hms': 'M月d日 HH:mm:ss',
  'MMMEd Hms': 'M月d日E HH:mm:ss',
  'MMMMd Hms': 'M月d日 HH:mm:ss',
  'y Hms': 'y年 HH:mm:ss',
  'yM Hms': 'y年M月 HH:mm:ss',
  'yMd Hms': 'y/M/d HH:mm:ss',
  'yMEd Hms': 'y/M/dE HH:mm:ss',
  'yMM Hms': 'y年M月 HH:mm:ss',
  'yMMM Hms': 'y年M月 HH:mm:ss',
  'yMMMd Hms': 'y年M月d日 HH:mm:ss',
  'yMMMEd Hms': 'y年M月d日E HH:mm:ss',
  'yMMMM Hms': 'y年M月 HH:mm:ss',
  'y年M月d日EEEE hmsv': 'y年M月d日EEEE v ah:mm:ss',
  'y年M月d日 hmsv': 'y年M月d日 v ah:mm:ss',
  'y/M/d hmsv': 'y/M/d v ah:mm:ss',
  'd hmsv': 'd日 v ah:mm:ss',
  'E hmsv': 'ccc v ah:mm:ss',
  'Ed hmsv': 'd日E v ah:mm:ss',
  'Gy hmsv': 'Gy年 v ah:mm:ss',
  'GyMMM hmsv': 'Gy年M月 v ah:mm:ss',
  'GyMMMd hmsv': 'Gy年M月d日 v ah:mm:ss',
  'GyMMMEd hmsv': 'Gy年M月d日E v ah:mm:ss',
  'M hmsv': 'M月 v ah:mm:ss',
  'Md hmsv': 'M/d v ah:mm:ss',
  'MEd hmsv': 'M/dE v ah:mm:ss',
  'MMdd hmsv': 'MM/dd v ah:mm:ss',
  'MMM hmsv': 'LLL v ah:mm:ss',
  'MMMd hmsv': 'M月d日 v ah:mm:ss',
  'MMMEd hmsv': 'M月d日E v ah:mm:ss',
  'MMMMd hmsv': 'M月d日 v ah:mm:ss',
  'y hmsv': 'y年 v ah:mm:ss',
  'yM hmsv': 'y年M月 v ah:mm:ss',
  'yMd hmsv': 'y/M/d v ah:mm:ss',
  'yMEd hmsv': 'y/M/dE v ah:mm:ss',
  'yMM hmsv': 'y年M月 v ah:mm:ss',
  'yMMM hmsv': 'y年M月 v ah:mm:ss',
  'yMMMd hmsv': 'y年M月d日 v ah:mm:ss',
  'yMMMEd hmsv': 'y年M月d日E v ah:mm:ss',
  'yMMMM hmsv': 'y年M月 v ah:mm:ss',
  'y年M月d日EEEE Hmsv': 'y年M月d日EEEE v HH:mm:ss',
  'y年M月d日 Hmsv': 'y年M月d日 v HH:mm:ss',
  'y/M/d Hmsv': 'y/M/d v HH:mm:ss',
  'd Hmsv': 'd日 v HH:mm:ss',
  'E Hmsv': 'ccc v HH:mm:ss',
  'Ed Hmsv': 'd日E v HH:mm:ss',
  'Gy Hmsv': 'Gy年 v HH:mm:ss',
  'GyMMM Hmsv': 'Gy年M月 v HH:mm:ss',
  'GyMMMd Hmsv': 'Gy年M月d日 v HH:mm:ss',
  'GyMMMEd Hmsv': 'Gy年M月d日E v HH:mm:ss',
  'M Hmsv': 'M月 v HH:mm:ss',
  'Md Hmsv': 'M/d v HH:mm:ss',
  'MEd Hmsv': 'M/dE v HH:mm:ss',
  'MMdd Hmsv': 'MM/dd v HH:mm:ss',
  'MMM Hmsv': 'LLL v HH:mm:ss',
  'MMMd Hmsv': 'M月d日 v HH:mm:ss',
  'MMMEd Hmsv': 'M月d日E v HH:mm:ss',
  'MMMMd Hmsv': 'M月d日 v HH:mm:ss',
  'y Hmsv': 'y年 v HH:mm:ss',
  'yM Hmsv': 'y年M月 v HH:mm:ss',
  'yMd Hmsv': 'y/M/d v HH:mm:ss',
  'yMEd Hmsv': 'y/M/dE v HH:mm:ss',
  'yMM Hmsv': 'y年M月 v HH:mm:ss',
  'yMMM Hmsv': 'y年M月 v HH:mm:ss',
  'yMMMd Hmsv': 'y年M月d日 v HH:mm:ss',
  'yMMMEd Hmsv': 'y年M月d日E v HH:mm:ss',
  'yMMMM Hmsv': 'y年M月 v HH:mm:ss',
  'y年M月d日EEEE hmv': 'y年M月d日EEEE v ah:mm',
  'y年M月d日 hmv': 'y年M月d日 v ah:mm',
  'y/M/d hmv': 'y/M/d v ah:mm',
  'd hmv': 'd日 v ah:mm',
  'E hmv': 'ccc v ah:mm',
  'Ed hmv': 'd日E v ah:mm',
  'Gy hmv': 'Gy年 v ah:mm',
  'GyMMM hmv': 'Gy年M月 v ah:mm',
  'GyMMMd hmv': 'Gy年M月d日 v ah:mm',
  'GyMMMEd hmv': 'Gy年M月d日E v ah:mm',
  'M hmv': 'M月 v ah:mm',
  'Md hmv': 'M/d v ah:mm',
  'MEd hmv': 'M/dE v ah:mm',
  'MMdd hmv': 'MM/dd v ah:mm',
  'MMM hmv': 'LLL v ah:mm',
  'MMMd hmv': 'M月d日 v ah:mm',
  'MMMEd hmv': 'M月d日E v ah:mm',
  'MMMMd hmv': 'M月d日 v ah:mm',
  'y hmv': 'y年 v ah:mm',
  'yM hmv': 'y年M月 v ah:mm',
  'yMd hmv': 'y/M/d v ah:mm',
  'yMEd hmv': 'y/M/dE v ah:mm',
  'yMM hmv': 'y年M月 v ah:mm',
  'yMMM hmv': 'y年M月 v ah:mm',
  'yMMMd hmv': 'y年M月d日 v ah:mm',
  'yMMMEd hmv': 'y年M月d日E v ah:mm',
  'yMMMM hmv': 'y年M月 v ah:mm',
  'y年M月d日EEEE Hmv': 'y年M月d日EEEE v HH:mm',
  'y年M月d日 Hmv': 'y年M月d日 v HH:mm',
  'y/M/d Hmv': 'y/M/d v HH:mm',
  'd Hmv': 'd日 v HH:mm',
  'E Hmv': 'ccc v HH:mm',
  'Ed Hmv': 'd日E v HH:mm',
  'Gy Hmv': 'Gy年 v HH:mm',
  'GyMMM Hmv': 'Gy年M月 v HH:mm',
  'GyMMMd Hmv': 'Gy年M月d日 v HH:mm',
  'GyMMMEd Hmv': 'Gy年M月d日E v HH:mm',
  'M Hmv': 'M月 v HH:mm',
  'Md Hmv': 'M/d v HH:mm',
  'MEd Hmv': 'M/dE v HH:mm',
  'MMdd Hmv': 'MM/dd v HH:mm',
  'MMM Hmv': 'LLL v HH:mm',
  'MMMd Hmv': 'M月d日 v HH:mm',
  'MMMEd Hmv': 'M月d日E v HH:mm',
  'MMMMd Hmv': 'M月d日 v HH:mm',
  'y Hmv': 'y年 v HH:mm',
  'yM Hmv': 'y年M月 v HH:mm',
  'yMd Hmv': 'y/M/d v HH:mm',
  'yMEd Hmv': 'y/M/dE v HH:mm',
  'yMM Hmv': 'y年M月 v HH:mm',
  'yMMM Hmv': 'y年M月 v HH:mm',
  'yMMMd Hmv': 'y年M月d日 v HH:mm',
  'yMMMEd Hmv': 'y年M月d日E v HH:mm',
  'yMMMM Hmv': 'y年M月 v HH:mm',
  'y年M月d日EEEE ms': 'y年M月d日EEEE mm:ss',
  'y年M月d日 ms': 'y年M月d日 mm:ss',
  'y/M/d ms': 'y/M/d mm:ss',
  'd ms': 'd日 mm:ss',
  'E ms': 'ccc mm:ss',
  'Ed ms': 'd日E mm:ss',
  'Gy ms': 'Gy年 mm:ss',
  'GyMMM ms': 'Gy年M月 mm:ss',
  'GyMMMd ms': 'Gy年M月d日 mm:ss',
  'GyMMMEd ms': 'Gy年M月d日E mm:ss',
  'M ms': 'M月 mm:ss',
  'Md ms': 'M/d mm:ss',
  'MEd ms': 'M/dE mm:ss',
  'MMdd ms': 'MM/dd mm:ss',
  'MMM ms': 'LLL mm:ss',
  'MMMd ms': 'M月d日 mm:ss',
  'MMMEd ms': 'M月d日E mm:ss',
  'MMMMd ms': 'M月d日 mm:ss',
  'y ms': 'y年 mm:ss',
  'yM ms': 'y年M月 mm:ss',
  'yMd ms': 'y/M/d mm:ss',
  'yMEd ms': 'y/M/dE mm:ss',
  'yMM ms': 'y年M月 mm:ss',
  'yMMM ms': 'y年M月 mm:ss',
  'yMMMd ms': 'y年M月d日 mm:ss',
  'yMMMEd ms': 'y年M月d日E mm:ss',
  'yMMMM ms': 'y年M月 mm:ss',
};

const PROCESSED_FORMATS = Object.keys(FORMATS).map(skeleton =>
  parseDateTimeSkeleton(skeleton, FORMATS[skeleton as 'Bh'])
);

test('test #2291', function () {
  const opts: DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    hourCycle: 'h12' as 'h12',
  };
  expect(BestFitFormatMatcher(opts, PROCESSED_FORMATS)).toEqual({
    day: '2-digit',
    hour: '2-digit',
    hour12: true,
    minute: '2-digit',
    month: 'numeric',
    pattern: '{year}年{month}月{day}日 {hour}:{minute}:{second}',
    pattern12: '{year}年{month}月{day}日 {ampm}{hour}:{minute}:{second}',
    rangePatterns: {},
    rangePatterns12: {},
    rawPattern: 'y年M月d日 ah:mm:ss',
    second: '2-digit',
    skeleton: 'yMMMd ah:mm:ss',
    year: 'numeric',
  });
});
