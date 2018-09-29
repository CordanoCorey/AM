import { RestoreModule } from './restore.module';

describe('RestoreModule', () => {
  let restoreModule: RestoreModule;

  beforeEach(() => {
    restoreModule = new RestoreModule();
  });

  it('should create an instance', () => {
    expect(restoreModule).toBeTruthy();
  });
});
