const moveLeft = (state, payload) => {
  const { from , ids } = payload
  const grids = state.data
  const keys = Object.keys(grids)      
  const fromArray = grids[from].filter(
      (val) => ids.map((item) => item).indexOf(val.id) === -1
  )
  const toArray = grids[from].filter(
      (val) => ids.map((item) => item).indexOf(val.id) > -1
   )  
  const to = keys[keys.findIndex(x => x === from ) - 1];         
  return { ...state.data,
      [from]: [...fromArray],
      [to]: [...grids[to], ...toArray]
      }
}

const moveRight = (state, payload) => {
  const { from , ids } = payload
  const grids = state.data
  const keys = Object.keys(grids)
  const fromArray = grids[from].filter(
      (val) => ids.map((item) => item).indexOf(val.id) === -1
  )
  const toArray = grids[from].filter(
      (val) => ids.map((item) => item).indexOf(val.id) > -1
  ) 
  const to = keys[keys.findIndex(x => x === from ) + 1];         
  return { ...state.data,
      [from]: [...fromArray],
      [to]: [...grids[to], ...toArray]
  }
}


const initialState = { 
    data:[],
    loading: true,
    error: null
};

const reducer = (state = initialState, action) => {

  switch (action.type) {

    case 'ON_MOVE_TO_RIGHT':
      return{
        ...state,
        data: moveRight(state, action.payload)
      }
    case 'ON_MOVE_TO_LEFT':
      return{
        ...state,
        data: moveLeft(state, action.payload)
      }
     

    case 'FETH_GRID_REQUEST':
      return {
        data: [],
        loading: true,
        error: null
      };
    case 'FETH_GRID_SUCCESS':
      return {
        data: action.payload,
        loading: false,
        error: null
      };

    case 'FETH_GRID_FAILURE':
    return {
      data: [],
      loading: false,
      error: action.payload
    };

    default:
      return state;
  }
};

export default reducer;
