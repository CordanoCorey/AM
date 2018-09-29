import { AnnouncementEditModule } from './announcement-edit.module';

describe('AnnouncementEditModule', () => {
  let announcementEditModule: AnnouncementEditModule;

  beforeEach(() => {
    announcementEditModule = new AnnouncementEditModule();
  });

  it('should create an instance', () => {
    expect(announcementEditModule).toBeTruthy();
  });
});
