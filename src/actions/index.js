
const gridLoaded = (newItems) => {
  return {
    type: 'FETH_GRID_SUCCESS',
    payload: newItems
  };
};

const gridRequested = () => {
  return {
    type: 'FETH_GRID_REQUEST'
  };
};

const gridError = (error) => {
  return {
    type: 'FETH_GRID_FAILURE',
    payload: error
  };
};

const onMoveToLeft = (from, ids) => {
  return{
    type: 'ON_MOVE_TO_LEFT',
    payload: {from, ids}
  }
}

const onMoveToRight = (from, ids) => {
  return{
    type: 'ON_MOVE_TO_RIGHT',
    payload: {from, ids}
  }
}

const fetchGrids = (gridService, dispatch) => () => {
  dispatch(gridRequested())
  gridService.getGrids()
            .then((data) => dispatch( gridLoaded(data)))
            .catch((error) => dispatch(gridError(error)))
}
export {
  onMoveToRight,
  onMoveToLeft,
  fetchGrids,
  gridError,
  gridRequested,
  gridLoaded
};
