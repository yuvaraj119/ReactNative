import { PUSH_ROUTE,POP_ROUTE } from '../constants/ActionTypes'
import { NavigationExperimental } from 'react-native'

const{
  StateUtils: NavigationStateUtils
}= NavigationExperimental

const initialState={
  index: 0,
  key:'root',
  routes:[{
    key:'login',
    title:'Login'
  }]
}

function navigationState (state = initialState,action){
  console.log(state);
  switch (action.type) {
    case PUSH_ROUTE:
      console.log(state);
      if(state.routes[state.index].key === (action.route && action.route.key)) return state
    return NavigationStateUtils.push(state,action.route)

    case POP_ROUTE:
      console.log(state);
      if(state.index==0 || state.routes.length===1) return state
      return NavigationStateUtils.pop(state)

    default:
      console.log(state);
      return state
  }
}


export default navigationState
