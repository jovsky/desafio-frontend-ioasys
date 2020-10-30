export default function navState(state = "BEGIN", action) {
  
  switch(action.type) {

    case 'SET_NAV_STATE':
      return action.navState

    case 'RESET_NAV_STATE':
      return "BEGIN"

    default:
      return state
  }
}

