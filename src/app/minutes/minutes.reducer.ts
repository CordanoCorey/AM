export class MinutesActions {
    static DELETE = '[Minutes] Delete Minutes';
    static GET = '[Minutes] Get Minutes';
    static POST = '[Minutes] Post Minutes';
    static PUT = '[Minutes] Put Minutes';
}

export function minutesReducer(state: Minutes = new Minutes(), action: Action): Minutes {
    switch (action.type) {

        default:
            return state;
    }
}

export function minutesSelector(store: Store<any>): Observable<Minutes> {
    return store.select('minutes');
}
