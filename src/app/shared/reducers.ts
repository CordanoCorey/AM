import { build, Action, toInt } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';

import { SearchActions } from './actions';

export function dashboardReducer(state: Dashboard = new Dashboard(), action: Action): Dashboard {
    switch (action.type) {

        case DashboardActions.GET:
            return build(Dashboard, action.payload);

        case DashboardActions.GET_MESSAGE:
            return build(Dashboard, action.payload);

        case DashboardActions.UPDATE_MESSAGE:
            return build(Dashboard, action.payload);

        default:
            return state;
    }
}

export function fileReducer(state: File = new File(), action: Action): File {
    switch (action.type) {

        case FileActions.DELETE:
            return state;

        case FileActions.GET:
            return state;

        case FileActions.PUT:
            return state;

        default:
            return state;
    }
}

export function filesReducer(state: Files = new Files(), action: Action): Files {
    switch (action.type) {

        case FilesActions.GET:
            return state;

        case FilesActions.POST:
            return build(Files, state.update(<File[]>action.payload));

        case FileActions.DELETE:
            return state;

        case FileActions.GET:
            return state;

        case FileActions.PUT:
            return state;

        default:
            return state;
    }
}

export function searchReducer(state: any = {}, action: Action): any {
    switch (action.type) {

        case SearchActions.POST:
            return state;

        default:
            return state;
    }
}
