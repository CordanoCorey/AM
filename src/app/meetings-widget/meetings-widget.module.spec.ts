import { MeetingsWidgetModule } from './meetings-widget.module';

describe('MeetingsWidgetModule', () => {
  let meetingsWidgetModule: MeetingsWidgetModule;

  beforeEach(() => {
    meetingsWidgetModule = new MeetingsWidgetModule();
  });

  it('should create an instance', () => {
    expect(meetingsWidgetModule).toBeTruthy();
  });
});
