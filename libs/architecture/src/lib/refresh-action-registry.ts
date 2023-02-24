import { Action } from '@ngrx/store';
import { filter, OperatorFunction } from 'rxjs';

export type RefreshAction<T extends object> = {
  type: string;
  (props: T): T & Action;
};

type ActionRegistry<T extends object> = {
  add: (action: RefreshAction<T>) => void;
  ofRefreshActions: OperatorFunction<Action, Action & T>;
};

export const refreshActionRegistry = <
  T extends object
>(): ActionRegistry<T> => {
  const actions: Record<string, RefreshAction<T>> = {};
  const add = (action: RefreshAction<T>) => {
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
