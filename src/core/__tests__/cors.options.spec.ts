import { originMathcRegexp } from '../cors.options';

describe('CORS', () => {
  it('originMathcRegexp', async () => {
    expect(
      originMathcRegexp('https://data.test.com', [
        /http:\/\/localhost$/,
        /http:\/\/127.0.0.1$/,
        /http:\/\/127.0.0.1:(\d+)$/
      ]),
    ).toBe(false);

    expect(
      originMathcRegexp('http://127.0.0.1:3000', [
        /http:\/\/localhost$/,
        /http:\/\/127.0.0.1$/,
        /http:\/\/127.0.0.1:(\d+)$/,
      ]),
    ).toBe(true);

    expect(
      originMathcRegexp('http://127.0.0.1', [
        /http:\/\/localhost$/,
        /http:\/\/127.0.0.1$/,
        /http:\/\/127.0.0.1:(\d+)$/,
      ]),
    ).toBe(true);
  });
});
