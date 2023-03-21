const consents = JSON.parse(localStorage.getItem('consents'))
const language = JSON.parse(localStorage.getItem('language'))

const initialState = {
  listConsents: consents || [],
  language: language || {}
}
export default function consentsSlice(state = initialState, action) {
  switch (action.type) {
    case 'CHOOSE_LANGUAGE': {
      localStorage.setItem('language', JSON.stringify(action.payload))
      return {
        ...state,
        language: action.payload
      }
    }

    case 'ADD_CONSENT': {
      const res = [...state.listConsents, { ...action.payload }]
      localStorage.setItem('consents', JSON.stringify(res))
      return {
        ...state,
        listConsents: res
      }
    }

    default: {
      return state
    }
  }
}
