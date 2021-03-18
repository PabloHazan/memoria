interface Action<Data = any> {
    type: string,
    data?: Data
}

const changeState = <State>(state: State, change: { [key: string]: any } = {}): State => ({ ...state, ...change });

type ReducerHandler<State> = (value: { state: State, data: any }) => {};

interface ReducerAtionHandler<State> {
    [key: string]: ReducerHandler<State>
}

type Reducer<State> = (state: State, action: Action) => State

export const ActionCreator = <Data = undefined>(actionType: string) => (data?: Data) => ({ type: actionType, data });

export const createReducer = <State>(initialState: State, actionHandlers: ReducerAtionHandler<State>): Reducer<State> =>
    (state: State = initialState, { type, data }: Action): State =>
        changeState<State>(state, actionHandlers[type]?.({ state, data }))
