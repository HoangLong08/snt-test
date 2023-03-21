export const chooseLanguage = (params) => {
  return {
    type: 'CHOOSE_LANGUAGE',
    payload: params
  }
}

export const addConsent = (params) => {
  return {
    type: 'ADD_CONSENT',
    payload: params
  }
}
