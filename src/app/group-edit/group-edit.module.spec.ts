import { GroupEditModule } from './group-edit.module';

describe('GroupEditModule', () => {
  let groupEditModule: GroupEditModule;

  beforeEach(() => {
    groupEditModule = new GroupEditModule();
  });

  it('should create an instance', () => {
    expect(groupEditModule).toBeTruthy();
  });
});
