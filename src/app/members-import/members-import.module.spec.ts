import { MembersImportModule } from './members-import.module';

describe('MembersImportModule', () => {
  let membersImportModule: MembersImportModule;

  beforeEach(() => {
    membersImportModule = new MembersImportModule();
  });

  it('should create an instance', () => {
    expect(membersImportModule).toBeTruthy();
  });
});
