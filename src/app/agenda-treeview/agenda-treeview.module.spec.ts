import { AgendaTreeviewModule } from './agenda-treeview.module';

describe('AgendaTreeviewModule', () => {
  let agendaTreeviewModule: AgendaTreeviewModule;

  beforeEach(() => {
    agendaTreeviewModule = new AgendaTreeviewModule();
  });

  it('should create an instance', () => {
    expect(agendaTreeviewModule).toBeTruthy();
  });
});
