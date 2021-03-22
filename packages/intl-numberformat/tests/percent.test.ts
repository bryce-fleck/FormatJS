import '@formatjs/intl-pluralrules/polyfill'
import {NumberFormat} from '../src/core'
import {NumberFormatOptions} from '@formatjs/ecma402-abstract'

const LOCALES = [
  'en',
  'en-GB',
  'da',
  'de',
  'es',
  'fr',
  'id',
  'it',
  'ja',
  'ko',
  'ms',
  'nb',
  'nl',
  'pl',
  'pt',
  'ru',
  'sv',
  'th',
  'tr',
  'uk',
  'zh',
  'en-BS',
]

LOCALES.forEach(locale => {
  require(`@formatjs/intl-pluralrules/locale-data/${locale.split('-')[0]}`)
  NumberFormat.__addLocaleData(require(`./locale-data/${locale}.json`))
})

const SIGN_DISPLAYS: Array<NumberFormatOptions['signDisplay']> = [
  'auto',
  'always',
  'never',
  'exceptZero',
]
const NOTATIONS: Array<NumberFormatOptions['notation']> = [
  'engineering',
  'scientific',
  'compact',
  'standard',
]

const COMPACT_DISPLAYS: Array<NumberFormatOptions['compactDisplay']> = [
  'long',
  'short',
]

function test() {
  LOCALES.forEach(locale => {
    describe(locale, function () {
      describe('percent', function () {
        SIGN_DISPLAYS.forEach(signDisplay =>
          describe(`signDisplay/${signDisplay}`, function () {
            NOTATIONS.forEach(notation =>
              describe(`notation/${notation}`, function () {
                COMPACT_DISPLAYS.forEach(compactDisplay =>
                  it(`compactDisplay/${compactDisplay}`, function () {
                    expect(
                      new NumberFormat(locale, {
                        style: 'percent',
                        signDisplay,
                        notation,
                        compactDisplay,
                      }).formatToParts(10000)
                    ).toMatchSnapshot()
                  })
                )
              })
            )
          })
        )
      })
    })
  })
}

// Node v8 does not have formatToParts and v12 has native NumberFormat.
describe('NumberFormat', test)
