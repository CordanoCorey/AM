import { EmailItemModule } from './email-item.module';

describe('EmailItemModule', () => {
  let emailItemModule: EmailItemModule;

  beforeEach(() => {
    emailItemModule = new EmailItemModule();
  });

  it('should create an instance', () => {
    expect(emailItemModule).toBeTruthy();
  });
});
