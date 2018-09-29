import { AgendaItemEditModule } from './agenda-item-edit.module';

describe('AgendaItemEditModule', () => {
  let agendaItemEditModule: AgendaItemEditModule;

  beforeEach(() => {
    agendaItemEditModule = new AgendaItemEditModule();
  });

  it('should create an instance', () => {
    expect(agendaItemEditModule).toBeTruthy();
  });
});
