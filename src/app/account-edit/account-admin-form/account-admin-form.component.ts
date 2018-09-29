import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormGroup, AbstractControl } from '@angular/forms';
import { FormComponent, Control, HttpService, QueryModel } from '@caiu/library';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Account } from '../../accounts/accounts.model';
import { User, UserSearchResult } from '../../shared/models';
import { AccountAdmin } from '../account-edit.model';

@Component({
  selector: 'am-account-admin-form',
  templateUrl: './account-admin-form.component.html',
  styleUrls: ['./account-admin-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toggle', [
      state('*', style({ height: '0px' })),
      state('show', style({ height: '*' })),
      state('hide', style({ height: '0px' })),
      transition('show <=> hide', [
        animate('500ms ease-out')
      ])
    ])
  ]
})
export class AccountAdminFormComponent extends FormComponent implements OnInit {

  @Input() account: Account = new Account();
  @Output() add = new EventEmitter<Account>();
  @Output() update = new EventEmitter<Account>();
  @Output() searchUsers = new EventEmitter<string>();
  @Control(AccountAdmin) public form: FormGroup;
  modelKey = 'account';
  modelChanges = ['id', 'ownerId'];
  opened = false;
  ownerId$: Observable<number>;
  ownerInput$: Observable<string>;
  searchResults: UserSearchResult[] = [];
  searchResults$: Observable<UserSearchResult[]>;
  searchTerm = '';

  constructor(private http: HttpService) {
    super();
    this.ownerId$ = this.ownerId.valueChanges;
    this.ownerInput$ = this.ownerInput.valueChanges;
    this.searchResults$ = this.ownerInput$.pipe(
      switchMap(ownerInput => this.autoComplete$)
    );
  }

  get autoComplete$() {
    return this.http.autocomplete('users', this.query)
      .pipe(
        map(response => response.results ? (<User[]>response.results).map(user => UserSearchResult.Build(user)) : [])
      );
  }

  get isValid(): boolean {
    return this.form.valid;
  }

  get model(): AccountAdmin {
    return new AccountAdmin(this.account);
  }

  get valueOut(): Account {
    return AccountAdmin.BuildAccount(this.account, this.form.value);
  }

  get ownerId(): AbstractControl {
    return this.form.get('ownerId');
  }

  get ownerIdChanges(): Subscription {
    return this.ownerId$.subscribe(id => {
      const user = this.findUserById(id);
      this.ownerInput.setValue(user.displayName);
    });
  }

  get ownerInput(): AbstractControl {
    return this.form.get('ownerInput');
  }

  get ownerInputChanges(): Subscription {
    return this.ownerInput$.subscribe(ownerInput => {
      this.searchTerm = ownerInput;
    });
  }

  get query(): QueryModel<User> {
    return Object.assign(new QueryModel<User>(), {
      skip: 0,
      take: 10,
      term: this.searchTerm
    });
  }

  get searchResultsChanges(): Subscription {
    return this.searchResults$.subscribe(results => {
      this.searchResults = results;
    });
  }

  get showInfo(): boolean {
    return !this.useExisting;
  }

  get showSearch(): boolean {
    return this.useExisting;
  }

  get useExisting(): boolean {
    return this.form.get('useExisting').value;
  }

  findUserById(id: number): UserSearchResult {
    return this.searchResults.find(user => user.id === id) || new UserSearchResult();
  }

  ngOnInit() {
    this.subscribe([this.ownerIdChanges, this.ownerInputChanges, this.searchResultsChanges]);
  }

  onSubmit(e: any) {
    if (this.editing) {
      this.add.emit(this.valueOut)
    } else {
      this.update.emit(this.valueOut);
    }
  }

  selectUser(user: UserSearchResult) {
    this.ownerId.setValue(user.id);
  }

  toggle() {
    this.opened = !this.opened;
  }

}
