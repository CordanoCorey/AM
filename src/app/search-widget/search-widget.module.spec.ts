import { SearchWidgetModule } from './search-widget.module';

describe('SearchWidgetModule', () => {
  let searchWidgetModule: SearchWidgetModule;

  beforeEach(() => {
    searchWidgetModule = new SearchWidgetModule();
  });

  it('should create an instance', () => {
    expect(searchWidgetModule).toBeTruthy();
  });
});
