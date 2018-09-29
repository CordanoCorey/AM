import { AgendaItemsModule } from './agenda-items.module';

describe('AgendaItemsModule', () => {
  let agendaItemsModule: AgendaItemsModule;

  beforeEach(() => {
    agendaItemsModule = new AgendaItemsModule();
  });

  it('should create an instance', () => {
    expect(agendaItemsModule).toBeTruthy();
  });
});
