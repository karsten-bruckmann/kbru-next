import { Action } from '@ngrx/store';
import { filter, OperatorFunction } from 'rxjs';

type RefreshActionCreator<T extends object> = {
  type: string;
  (props: T): T & Action;
};

type ActionRegistry<T extends object> = {
  add: (action: RefreshActionCreator<T>) => void;
  ofRefreshActions: OperatorFunction<Action, Action & T>;
};

export const refreshActionRegistry = <
  T extends object
>(): ActionRegistry<T> => {
  const actions: Record<string, RefreshActionCreator<T>> = {};
  const add = (action: RefreshActionCreator<T>) => {
    actions[action.type] = action;
  };
  const ofRefreshActions: OperatorFunction<Action, Action & T> = (actions$) =>
    actions$.pipe(
      filter((action): action is Action & T =>
        Object.keys(actions).includes(action.type)
      )
    );

  return {
    add,
    ofRefreshActions,
  };
};
