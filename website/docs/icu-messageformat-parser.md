---
id: icu-messageformat-parser
title: ICU MessageFormat Parser
---

Parses [ICU Message strings](https://unicode-org.github.io/icu/userguide/format_parse/messages) into an AST via JavaScript.

[![npm Version](https://badgen.net/npm/v/@formatjs/icu-messageformat-parser)](https://www.npmjs.com/package/@formatjs/icu-messageformat-parser)
[![size](https://badgen.net/bundlephobia/minzip/@formatjs/icu-messageformat-parser)](https://bundlephobia.com/result?p=@formatjs/icu-messageformat-parser)

## Overview

This package implements a parser in JavaScript that parses the industry standard [ICU Message strings](https://unicode-org.github.io/icu/userguide/format_parse/messages) — used for internationalization — into an AST. The produced AST can then be used by a compiler, like [`intl-messageformat`](./intl-messageformat.md), to produce localized formatted strings for display to users.

## Usage

```ts
import {parse} from '@formatjs/icu-messageformat-parser'
const ast = parse(`this is {count, plural, 
  one{# dog} 
  other{# dogs}
}`)
```

### Example

```tsx live
<pre>
  {JSON.stringify(
    IcuMessageFormatParser.parse(
      `On {takenDate, date, short} <bold>{name}</bold> took {numPhotos, plural,
          =0 {no photos.}
          =1 {one photo.}
          other {# photos.}
        }`
    ),
    undefined,
    2
  )}
</pre>
```

## Supported DateTime Skeleton

ICU provides a [wide array of pattern](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table) to customize date time format. However, not all of them are available via ECMA402's Intl API. Therefore, our parser only support the following patterns

| Symbol | Meaning                       | Notes                     |
| ------ | ----------------------------- | ------------------------- |
| G      | Era designator                |
| y      | year                          |
| M      | month in year                 |
| L      | stand-alone month in year     |
| d      | day in month                  |
| E      | day of week                   |
| e      | local day of week             | `e..eee` is not supported |
| c      | stand-alone local day of week | `c..ccc` is not supported |
| a      | AM/PM marker                  |
| h      | Hour [1-12]                   |
| H      | Hour [0-23]                   |
| K      | Hour [0-11]                   |
| k      | Hour [1-24]                   |
| m      | Minute                        |
| s      | Second                        |
| z      | Time Zone                     |

## Benchmarks

```
complex_msg AST length 10861
normal_msg AST length 1665
simple_msg AST length 364
string_msg AST length 131

complex_msg x 29,940 ops/sec ±1.23% (89 runs sampled)
normal_msg x 253,612 ops/sec ±1.01% (92 runs sampled)
simple_msg x 1,805,642 ops/sec ±0.70% (94 runs sampled)
string_msg x 2,694,133 ops/sec ±1.05% (95 runs sampled)
```
