export default function userSession(state = {
  logged: false,
  headers: {}
}, action) {
  
  switch(action.type) {

    case 'SET_SESSION':
      return {
        logged: action.session.success,
        headers: action.session.headers
      }

    case 'RESET_USERNAME':
      return {
        logged: false,
        headers: {}
      }

    default:
      return state
  }
}

