import Immutable from 'immutable';

const defaultState = Immutable.List();

export default function todoReducer(state = defaultState, action) {
  switch(action.type) {
    case 'GET_TODOS':
      return Immutable.List(action.res.data);

    case 'CREATE_TODO':
      return state.concat(action.res.data.text);

    case 'EDIT_TODO':
      return state.set(action.id, action.text);

    case 'DELETE_TODO':
      return state.delete(action.id);

    default:
      return state;
  }
}
