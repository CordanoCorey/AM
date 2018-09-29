import { NgModule } from '@angular/core';

import { VotesComponent } from './votes.component';
import { VoteComponent } from './vote/vote.component';
import { VoteResultsComponent } from './vote-results/vote-results.component';
import { VoteCountPipe } from './vote-results/vote-count.pipe';
import { VotesFormComponent } from './votes-form/votes-form.component';
import { NotCastTextPipe } from './votes-form/not-cast-text.pipe';
import { VotesPreviewComponent } from './votes-preview/votes-preview.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    VotesComponent,
    VoteComponent,
    VoteResultsComponent,
    VotesFormComponent,
    VotesPreviewComponent,
    VoteCountPipe,
    NotCastTextPipe,
  ],
  exports: [
    VotesComponent,
    VotesPreviewComponent,
  ]
})
export class VotesModule { }
