import { createSlice } from '@reduxjs/toolkit'
//current
const consents = JSON.parse(localStorage.getItem('consents'))
const language = JSON.parse(localStorage.getItem('language'))

const consentsSlice = createSlice({
  name: 'consents',
  initialState: {
    listConsents: consents || [],
    language: language || {}
  },
  reducers: {
    chooseLanguage: (state, action) => {
      state.language = action.payload
      localStorage.setItem('language', JSON.stringify(action.payload))
    },

    addConsent: (state, action) => {
      const res = [...state.listConsents, { ...action.payload }]
      state.listConsents = res
      localStorage.setItem('consents', JSON.stringify(res))
    }
  },

  extraReducers: {}
})

export const { chooseLanguage, addConsent } = consentsSlice.actions

export default consentsSlice.reducer
