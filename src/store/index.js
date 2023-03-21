import { combineReducers } from 'redux'
import consentsSlice from './consents/consent.reducer'

export default combineReducers({
  consentsSlice: consentsSlice
})
