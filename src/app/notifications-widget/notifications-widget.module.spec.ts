import { NotificationsWidgetModule } from './notifications-widget.module';

describe('NotificationsWidgetModule', () => {
  let notificationsWidgetModule: NotificationsWidgetModule;

  beforeEach(() => {
    notificationsWidgetModule = new NotificationsWidgetModule();
  });

  it('should create an instance', () => {
    expect(notificationsWidgetModule).toBeTruthy();
  });
});
