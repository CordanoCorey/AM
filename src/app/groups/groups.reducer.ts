import { build, Action, toInt, compareStrings } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged, mergeMap } from 'rxjs/operators';

import { Groups, Group, GroupMember } from './groups.model';

export class GroupsActions {
    static ACTIVATE = '[Groups] Activate';
    static GET = '[Groups] Get';
    static GET_ACCOUNT_GROUPS = '[Groups] Get Account Groups';
    static GET_USER_GROUPS = '[Groups] Get User Groups';
    static POST = '[Groups] Post';

    static activate(id: number): Action {
        return {
            type: GroupsActions.ACTIVATE,
            payload: id
        };
    }
}

export class GroupActions {
    static DELETE = '[Group] Get';
    static GET = '[Group] Get';
    static GET_MEMBERS = '[Group] Get Members';
    static PUT = '[Group] Get';
}

export function groupsReducer(state: Groups = new Groups(), action: Action): Groups {
    switch (action.type) {

        case GroupsActions.ACTIVATE:
            return build(Groups, { activeId: <number>action.payload });

        case GroupsActions.GET:
            return build(Groups, state.update(<Group[]>action.payload));

        case GroupsActions.GET_USER_GROUPS:
            return build(Groups, state.update((<GroupMember[]>action.payload).map(member => member.group)));

        case GroupsActions.GET_ACCOUNT_GROUPS:
            return build(Groups, state.update(<Group[]>action.payload));

        case GroupActions.DELETE:
            return build(Groups, state.delete(<number>action.payload));

        case GroupActions.GET:
            return build(Groups, state.update(<Group>action.payload));

        case GroupActions.PUT:
            return build(Groups, state.update(<Group>action.payload));

        default:
            return state;
    }
}

export function groupsSelector(store: Store<any>): Observable<Groups> {
    return store.select('groups');
}

export function groupsSearchSelector(store: Store<any>, filter?: (group: Group) => boolean): Observable<Group[]> {
    return groupsSelector(store).pipe(
        map(groups => filter ? groups.toArray().filter(filter) : groups.toArray())
    );
}

export function activeGroupIdSelector(store: Store<any>): Observable<number> {
    return groupsSelector(store).pipe(
        map(groups => toInt(groups.activeId)),
        distinctUntilChanged()
    );
}

export function groupSelector(store: Store<any>): Observable<Group> {
    return groupsSelector(store).pipe(
        map(groups => groups.active || new Group())
    );
}

export function accountGroupsSelector(store: Store<any>, accountId: number): Observable<Group[]> {
    return groupsSearchSelector(store, g => g.accountId === accountId).pipe(
        map(groups => groups.sort((a, b) => compareStrings(a.name, b.name)))
    );
}

export function adminGroupsSelector(store: Store<any>): Observable<Group[]> {
    return currentUserIdSelector(store).pipe(
        mergeMap(id => groupsSearchSelector(store, g => g.administratorId === id))
    );
}
