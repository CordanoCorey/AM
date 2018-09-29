import { BinItemsModule } from './bin-items.module';

describe('BinItemsModule', () => {
  let binItemsModule: BinItemsModule;

  beforeEach(() => {
    binItemsModule = new BinItemsModule();
  });

  it('should create an instance', () => {
    expect(binItemsModule).toBeTruthy();
  });
});
