import { Dispatch, PropsWithChildren, useMemo, useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';

import { CreateToastDTO, ToastDetail, ToastsContext, ToastsContextValue } from './ToastsContext';

/**
 * The `ToastsContext` reducer `state`.
 */
type ToastsContextState = {
  toasts: ToastDetail[];
};

/**
 * The available `ToastsContext` action types.
 */
enum ToastAction {
  Create = 'Create',
  Remove = 'Remove',
}

/**
 * The `ToastContext` action type definitions. Each action consists
 * of a `type` and a `payload`.
 *
 * The `type` indicates the specific action to be performed.
 *
 * The `payload` contains information specific to the `type` of action
 * requested.
 */
type ToastsContextAction =
  | { type: ToastAction.Create; payload: ToastDetail }
  | { type: ToastAction.Remove; payload: string };

/**
 * The default `state` of the reducer.
 */
const DEFAULT_STATE: ToastsContextState = { toasts: [] };

/**
 * The reducer function mutates the state as actions are dispatched.
 * @param {ToastsContextState} state - The current reducer state.
 * @param {ToastsContextAction} action - The action to be applied to the state.
 * @returns {ToastsContextState} The updated state.
 */
const reducer = (state: ToastsContextState, action: ToastsContextAction): ToastsContextState => {
  const { payload, type } = action;

  switch (type) {
    case ToastAction.Create:
      return {
        ...state,
        toasts: [...state.toasts, payload],
      };
    case ToastAction.Remove:
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== payload),
      };
    default:
      return state;
  }
};

/**
 * Creates the action functions which may be used to request mutations to the
 * `state`.
 * @param dispatch - The reducer dispatch function.
 * @returns An object whose properties are action functions.
 */
const actions = (dispatch: Dispatch<ToastsContextAction>) => {
  const createToast = ({ text, isAutoDismiss }: CreateToastDTO): void => {
    dispatch({
      type: ToastAction.Create,
      payload: {
        id: uuid(),
        createdAt: dayjs().toISOString(),
        isAutoDismiss,
        text,
      },
    });
  };

  const removeToast = (id: string): void => {
    dispatch({
      type: ToastAction.Remove,
      payload: id,
    });
  };

  return {
    createToast,
    removeToast,
  };
};

/**
 * The `ToastsProvider` React component creates, maintains, and provides
 * access to the `ToastsContext` value.
 * @param {PropsWithChildren} props - Component properties, `PropsWithChildren`.
 * @returns {JSX.Element} JSX
 */
const ToastsProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [{ toasts }, dispatch] = useReducer(reducer, DEFAULT_STATE);

  const value = useMemo<ToastsContextValue>(() => {
    const { createToast, removeToast } = actions(dispatch);
    return {
      toasts,
      createToast,
      removeToast,
    };
  }, [toasts]);

  return <ToastsContext.Provider value={value}>{children}</ToastsContext.Provider>;
};

export default ToastsProvider;
