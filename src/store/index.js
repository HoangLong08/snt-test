import { configureStore } from '@reduxjs/toolkit'
import consentsSlice from './consents/consent.reducer'

const store = configureStore({
  reducer: {
    consentsSlice
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export default store
