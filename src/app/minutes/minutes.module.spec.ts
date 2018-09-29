import { MinutesModule } from './minutes.module';

describe('MinutesModule', () => {
  let minutesModule: MinutesModule;

  beforeEach(() => {
    minutesModule = new MinutesModule();
  });

  it('should create an instance', () => {
    expect(minutesModule).toBeTruthy();
  });
});
