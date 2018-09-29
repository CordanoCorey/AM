import { VotesModule } from './votes.module';

describe('VotesModule', () => {
  let votesModule: VotesModule;

  beforeEach(() => {
    votesModule = new VotesModule();
  });

  it('should create an instance', () => {
    expect(votesModule).toBeTruthy();
  });
});
