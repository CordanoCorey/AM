import { AgendaItemModule } from './agenda-item.module';

describe('AgendaItemModule', () => {
  let agendaItemModule: AgendaItemModule;

  beforeEach(() => {
    agendaItemModule = new AgendaItemModule();
  });

  it('should create an instance', () => {
    expect(agendaItemModule).toBeTruthy();
  });
});
