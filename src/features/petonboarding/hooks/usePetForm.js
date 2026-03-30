import { useReducer, useCallback } from "react";
import { INITIAL_STATE } from "../types/formTypes";

const SET_FIELD  = "SET_FIELD";
const SET_ERRORS = "SET_ERRORS";
const SET_STEP   = "SET_STEP";
const SET_STATUS = "SET_STATUS";
const RESET      = "RESET";

const init = { data: { ...INITIAL_STATE }, errors: {}, step: 0, status: "idle", extra: null };

function reducer(state, { type, ...p }) {
  switch (type) {
    case SET_FIELD:  return { ...state, data: { ...state.data, [p.field]: p.value }, errors: { ...state.errors, [p.field]: undefined } };
    case SET_ERRORS: return { ...state, errors: { ...state.errors, ...p.errors } };
    case SET_STEP:   return { ...state, step: p.step, errors: {} };
    case SET_STATUS: return { ...state, status: p.status, extra: p.extra ?? state.extra };
    case RESET:      return { ...init, data: { ...INITIAL_STATE } };
    default:         return state;
  }
}

export const usePetForm = () => {
  const [state, dispatch] = useReducer(reducer, init);
  return {
    state,
    setField:  useCallback((field, value)  => dispatch({ type: SET_FIELD,  field, value }),  []),
    setErrors: useCallback((errors)        => dispatch({ type: SET_ERRORS, errors }),         []),
    setStep:   useCallback((step)          => dispatch({ type: SET_STEP,   step }),           []),
    setStatus: useCallback((status, extra) => dispatch({ type: SET_STATUS, status, extra }),  []),
    reset:     useCallback(()              => dispatch({ type: RESET }),                      []),
  };
};