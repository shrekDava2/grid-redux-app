import * as actionsType from '../actions-type'

const initialState = { 
  data:     {},
  loading:  true,
  error:    null
}
const move = ({ data }, { from, to, ids }) => {
  const fromArray = data[from].filter(val => !ids.includes(val.id))  
  const toArray   = data[from].filter(val => ids.includes(val.id))  
  return {  
        ...data,
        [from]: [...fromArray],
        [to]: [...data[to], ...toArray]
      }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.ON_MOVE:
      return{
        ...state,
        data: move(state, action.payload)
      }
    case actionsType.FETH_KEYS:
      return Object.keys(state.data)

    case actionsType.FETH_GRID_REQUEST:
      return {
        data: {},
        loading: true,
        error: null
      }
    case actionsType.FETH_GRID_SUCCESS:
      return {
        data:     action.payload,
        loading:  false,
        error:    null
      }

    case actionsType.FETH_GRID_FAILURE:
      return {
        data:     {},
        loading:  false,
        error:    action.payload
      }

    default:
      return state
  }
}

export default reducer
