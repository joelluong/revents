import { ActionCreatorWithOptionalPayload, ActionCreatorWithoutPayload, ActionCreatorWithPayload, ActionCreatorWithPreparedPayload, createSlice, PayloadAction, SliceCaseReducers, ValidateSliceCaseReducers } from "@reduxjs/toolkit"

export interface GenericState<T> {
    data: T
    status: 'loading' | 'finished' | 'error',
    errors?: any
  }
  
  export const createGenericSlice = <
    T,
    Reducers extends SliceCaseReducers<GenericState<T>>,
  >({
    name = '',
    initialState,
    reducers,
  }: {
    name: string
    initialState: GenericState<T>
    reducers: ValidateSliceCaseReducers<GenericState<T>, Reducers>
  }) => {
    return createSlice({
      name,
      initialState,
      reducers: {
        loading: (state) => {
          state.status = 'loading'
        },
        /**
         * If you want to write to values of the state that depend on the generic
         * (in this case: `state.data`, which is T), you might need to specify the
         * State type manually here, as it defaults to `Draft<GenericState<T>>`,
         * which can sometimes be problematic with yet-unresolved generics.
         * This is a general problem when working with immer's Draft type and generics.
         */
        success: (state: GenericState<T>, action: PayloadAction<T>) => {
          state.data = action.payload
          state.status = 'finished'
        },
        error: (state, action) => {
            state.errors = action.payload
            state.status = 'error'
        },
        ...reducers,
      },
    })
  }

  export type GenericActions<T> = {
    loading: ActionCreatorWithoutPayload<string>;
    success: ActionCreatorWithPayload<T, string> | ActionCreatorWithPreparedPayload<any, T, string, never, never>;
    error: ActionCreatorWithOptionalPayload<any, string>;
  }

//   const wrappedSlice = createGenericSlice({
//     name: 'test',
//     initialState: { status: 'loading' } as GenericState<string>,
//     reducers: {
//       magic(state) {
//         state.status = 'finished'
//         state.data = 'hocus pocus'
//       },
//     },
//   })