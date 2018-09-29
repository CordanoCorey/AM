import { AnnouncementsWidgetModule } from './announcements-widget.module';

describe('AnnouncementsWidgetModule', () => {
  let announcementsWidgetModule: AnnouncementsWidgetModule;

  beforeEach(() => {
    announcementsWidgetModule = new AnnouncementsWidgetModule();
  });

  it('should create an instance', () => {
    expect(announcementsWidgetModule).toBeTruthy();
  });
});
