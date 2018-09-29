import { AgendaEditModule } from './agenda-edit.module';

describe('AgendaEditModule', () => {
  let agendaEditModule: AgendaEditModule;

  beforeEach(() => {
    agendaEditModule = new AgendaEditModule();
  });

  it('should create an instance', () => {
    expect(agendaEditModule).toBeTruthy();
  });
});
