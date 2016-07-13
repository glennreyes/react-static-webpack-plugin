/* @flow */
import { fromJS, OrderedMap, Record } from 'immutable';
import { v4 } from 'node-uuid';

import * as Forms from '../forms';

const uuid = () => v4();

const ADD_THING = 'redux-example/things/ADD_THING';
export const FORM_ID = 'redux-example/things/_form'

const Thing = Record({
  id: null,
  text: '',
  created: Date.now(),
  updated: Date.now(),
});

const fromJSON = (things) => {
  return fromJS(things)
    .map(Thing)
    .toOrderedMap()
    .mapKeys((k, v) => v.id);
};

/**
 * This is the initial state of our app, and also displayes the shape. The app
 * state shape should never be any more or less than this.
 */
const initialState = fromJS({
  loading: false,
  error: null,
  data: fromJSON([uuid(), uuid(), uuid()].map((id, i) => ({ id, text: `Thing ${i}` }))),
});

/* **************************************************************************
 * Reducer
 * *************************************************************************/

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
  case ADD_THING:
    return state.set(payload.id, payload);
  default:
    return state;
  }
}

/* **************************************************************************
 * Action Creators
 * *************************************************************************/

export function addThing(thing) {
  if (!thing.id) {
    thing.id = uuid();
  }

  return {
    type: ADD_THING,
    payload: thing,
  };
}

export function initialize() {
  return Forms.registerForm({ id: FORM_ID, initialValues: {} });
}

export function teardown() {
  return Forms.unregisterForm(FORM_ID);
}

export function updateForm(key, value) {
  return Forms.updateForm({
    keypath: [FORM_ID, 'currentValues', key],
    value,
  });
}