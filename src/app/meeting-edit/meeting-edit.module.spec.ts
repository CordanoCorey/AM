import { MeetingEditModule } from './meeting-edit.module';

describe('MeetingEditModule', () => {
  let meetingEditModule: MeetingEditModule;

  beforeEach(() => {
    meetingEditModule = new MeetingEditModule();
  });

  it('should create an instance', () => {
    expect(meetingEditModule).toBeTruthy();
  });
});
