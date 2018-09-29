import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'am-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss']
})
export class VotesComponent extends SmartComponent implements OnInit {

  showVote$: Observable<boolean>;
  showVoteResults$: Observable<boolean>;
  vote$: Observable<Vote>;
  votes$: Observable<Votes>;

  constructor(public store: Store<any>) {
    super(store);
    this.showVote$ = Observable.of(true);
    this.showVoteResults$ = Observable.of(true);
    this.votes$ = votesSelector(this.store);
    this.vote$ = Observable.of(new Vote());
  }

  ngOnInit() {
  }

  addVote(vote: Vote) {
    this.dispatch(HttpActions.post(`agendaitems/${vote.agendaItemId}/votes`, vote, VotesActions.POST));
  }

  saveVotes(agendaItemId: number, votes: Vote[]) {
    this.dispatch(HttpActions.put(`agendaitems/${agendaItemId}/votes`, votes, VotesActions.PUT));
  }

  updateVote(vote: Vote) {
    this.dispatch(HttpActions.put(`votes/${vote.id}`, vote, VoteActions.PUT));
  }

}
