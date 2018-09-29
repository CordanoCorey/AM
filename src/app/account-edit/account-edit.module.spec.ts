import { AccountEditModule } from './account-edit.module';

describe('AccountEditModule', () => {
  let accountEditModule: AccountEditModule;

  beforeEach(() => {
    accountEditModule = new AccountEditModule();
  });

  it('should create an instance', () => {
    expect(accountEditModule).toBeTruthy();
  });
});
