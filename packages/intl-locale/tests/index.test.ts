import {Locale} from '../src';
import '@formatjs/intl-getcanonicallocales/polyfill';
describe('intl-locale', () => {
  it('toString', function () {
    // expect(() => IntlLocale.prototype.toString.call(IntlLocale.prototype)).toThrowError(TypeError)
    expect(
      new Locale('en-u-foo-bar-nu-thai-ca-buddhist-kk-true').toString()
    ).toBe('en-u-bar-foo-ca-buddhist-kk-nu-thai');
  });
});
