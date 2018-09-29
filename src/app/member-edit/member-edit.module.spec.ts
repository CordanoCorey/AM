import { MemberEditModule } from './member-edit.module';

describe('MemberEditModule', () => {
  let memberEditModule: MemberEditModule;

  beforeEach(() => {
    memberEditModule = new MemberEditModule();
  });

  it('should create an instance', () => {
    expect(memberEditModule).toBeTruthy();
  });
});
