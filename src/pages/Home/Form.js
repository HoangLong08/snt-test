import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { locales } from 'i18n/i18n'
import { IconArrowRight } from 'assets'
import { useDispatch } from 'react-redux'
import Button from 'components/Button'
import Consent from './Consent'
import { chooseLanguage } from 'store/consents/consent.action'

function Form() {
  const dispatch = useDispatch()
  const { i18n } = useTranslation('home')
  const [speaking, setSpeaking] = useState(false)
  const { t } = useTranslation('home')

  const [isOpenConsent, setIsOpenConsent] = useState()
  const [valueForm, setValueForm] = useState({
    name: '',
    language: ''
  })

  const speak = (str) => {
    setSpeaking(true)
    const utterance = new SpeechSynthesisUtterance(str)
    utterance.onend = () => {
      // alert('Audio playback finished.')
      setSpeaking(false)
    }
    window.speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    if (isOpenConsent) {
      speak(t('content') + '    ' + t('question'))
    }
  }, [isOpenConsent, t])

  const [errorForm, setErrorForm] = useState({
    name: '',
    language: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'language') {
      i18n.changeLanguage(value)
    }
    setValueForm({
      ...valueForm,
      [name]: value.trim()
    })
  }

  const handleSubmit = () => {
    let isValid = true
    const newError = {
      name: '',
      language: ''
    }
    if (valueForm.name.length === 0) {
      isValid = false
      newError.name = 'Enter your name'
    } else {
      newError.name = ''
    }

    if (valueForm.language.length === 0) {
      isValid = false
      newError.language = 'Choose your language'
    } else {
      newError.language = ''
    }

    if (isValid) {
      // dispatch(chooseLanguage(valueForm.language))
      dispatch(chooseLanguage(valueForm.language))
      setIsOpenConsent(true)
    } else {
      setIsOpenConsent(false)
    }

    setErrorForm({ ...newError })
  }

  return (
    <div className='wrapper-form'>
      {!isOpenConsent && (
        <>
          <div className='form-group'>
            <label htmlFor='name'>
              <p className='form-title'>Name</p>
              <input
                type='text'
                id='name'
                placeholder='Enter your name'
                name='name'
                value={valueForm.name}
                onChange={handleChange}
                className={`form-input${
                  errorForm.name ? ' form-input-error' : ''
                }`}
              />
            </label>
            {errorForm.name && (
              <small className='form-error'>{errorForm.name}</small>
            )}
          </div>
          <div className='form-group'>
            <label htmlFor='language'>
              <p className='form-title'>Language</p>
              <select
                name='language'
                id='language'
                className={`form-select${
                  errorForm.language ? ' form-input-error' : ''
                }`}
                placeholder='Select language'
                value={valueForm.language}
                onChange={handleChange}
              >
                <option value='' disabled>
                  Select language
                </option>
                {locales.map((item) => (
                  <option key={item.key} value={item.key}>
                    {item.title}
                  </option>
                ))}
              </select>
              {errorForm.language && (
                <small className='form-error'>{errorForm.language}</small>
              )}
            </label>
          </div>
          <div className='form-bottom'>
            <Button
              title='Next'
              icon={<IconArrowRight />}
              onClick={handleSubmit}
            />
          </div>
        </>
      )}
      {isOpenConsent && (
        <Consent speaking={speaking} speak={speak} valueForm={valueForm} />
        // <h1>Consent</h1>
      )}
    </div>
  )
}

export default Form
