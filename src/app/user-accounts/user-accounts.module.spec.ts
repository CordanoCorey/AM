import { UserAccountsModule } from './user-accounts.module';

describe('UserAccountsModule', () => {
  let userAccountsModule: UserAccountsModule;

  beforeEach(() => {
    userAccountsModule = new UserAccountsModule();
  });

  it('should create an instance', () => {
    expect(userAccountsModule).toBeTruthy();
  });
});
