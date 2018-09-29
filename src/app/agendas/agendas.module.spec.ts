import { AgendasModule } from './agendas.module';

describe('AgendasModule', () => {
  let agendasModule: AgendasModule;

  beforeEach(() => {
    agendasModule = new AgendasModule();
  });

  it('should create an instance', () => {
    expect(agendasModule).toBeTruthy();
  });
});
