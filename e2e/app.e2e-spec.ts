import { WeatherForecastSamplePage } from './app.po';

describe('weather-forecast App', function() {
  let page: WeatherForecastSamplePage;

  beforeEach(() => {
    page = new WeatherForecastSamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
