import * as actionsType from '../actions-type'


const gridLoaded = newItems => {
  return {
    type: actionsType.FETH_GRID_SUCCESS,
    payload: newItems
  };
};

const gridRequested = () => {
  return {
    type: actionsType.FETH_GRID_REQUEST
  };
};

const gridError = error => {
  return {
    type: actionsType.FETH_GRID_FAILURE,
    payload: error
  };
};

const onMove = prop => {
  return{
    type: actionsType.ON_MOVE,
    payload: prop
  }
}
/*
const fetchKeys = () => {
  return{
    type: actionsType.FETH_KEYS
  }
}
*/
const fetchGrids = (gridService, dispatch) => () => {
  dispatch(gridRequested())
  gridService.getGrids()
            .then( data   => dispatch(gridLoaded(data)))
            .catch( error => dispatch(gridError(error)))
}

export {
  onMove,
  fetchGrids,
  //fetchKeys,
  gridError,
  gridRequested,
  gridLoaded
};
