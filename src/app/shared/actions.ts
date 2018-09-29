export { ConfigActions, CurrentUserActions } from '@caiu/library';
import { StorageActions, Action, CurrentUser } from '@caiu/library';

import { Tabs } from './models';

export class AppActions {
    static INIT_STORE = StorageActions.INIT_STORE;
    static LOAD_JSON = '[App] Load Json';

    static initStore(store: any): Action {
        return {
            type: AppActions.INIT_STORE,
            payload: store
        };
    }

}

export class DashboardActions {
    static GET = `[Dashboard] Get`;
    static GET_ERROR = `[Dashboard] Get Error`;
    static GET_MESSAGE = `[Dashboard] Get Message`;
    static UPDATE_MESSAGE = `[Dashboard] Update Message`;
}

export class FileActions {
    static DELETE = '[File] Delete';
    static GET = '[File] Get';
    static PUT = '[File] Put';
}

export class FilesActions {
    static GET = '[Files] Get';
    static POST = '[Files] Post';
}

export class SearchActions {
    static POST = '[Search] Post';
}

export class TabsActions {
    static ACTIVATE = '[Tabs] Active Tab';
    static UPDATE_TABS = '[Tabs] Update Tabs';

    static activate(activeTab: string, order: string[] = []): Action {
        return {
            type: TabsActions.ACTIVATE,
            payload: { activeTab, order }
        };
    }

    static updateTabs(tabs: Tabs): Action {
        return {
            type: TabsActions.UPDATE_TABS,
            payload: tabs
        };
    }
}

export class UserActions {
    static ACTIVATE = '[User] Set Active User';
    static GET_PROFILE = '[User] Get Profile';
    static DELETE = '[User] Delete';
    static PUT = '[User] Put';
    static IMPERSONATE = '[User] Impersonate User';
    static LOGOUT = '[User] Logout';
    static LOGIN_SUCCESS = '[User] Login Success';
    static LOGIN_ERROR = '[User] Login Error';
    static RECOVER_PASSWORD = '[User] Recover Password';
    static RESET_PASSWORD = '[User] Reset Password';
    static REVERT_TO_ADMIN = '[User] Revert to Admin';
    static UPDATE_PROFILE = '[User] Update Profile';
    static UPDATE_USER = '[User] Update User';

    static impersonate(userId: number): Action {
        return {
            type: UserActions.IMPERSONATE,
            payload: userId
        };
    }

    static logout(): Action {
        return {
            type: UserActions.LOGOUT
        };
    }

    static recoverPassword(): Action {
        return {
            type: UserActions.RECOVER_PASSWORD
        };
    }

    static resetPassword(payload: any): Action {
        return {
            type: UserActions.RESET_PASSWORD,
            payload: payload
        };
    }

    static update(user: CurrentUser): Action {
        return {
            type: UserActions.UPDATE_USER,
            payload: user
        };
    }

}

export class UsersActions {
    static GET = '[Users] Get';
    static POST = '[Users] Post';
}
