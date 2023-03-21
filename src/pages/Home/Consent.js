import React, { useState } from 'react'
import { IconMic } from 'assets'
import Button from 'components/Button'
import { useTranslation } from 'react-i18next'
import { IconArrowRight, IconPause, IconPlay, IconReplay } from 'assets'
import Success from './Success'
import { useDispatch } from 'react-redux'
import { addConsent } from 'store/consents/consent.action'
import { useSelector } from 'react-redux'

const TIME_END_SPEECH = 4000

function Consent({ speaking, speak, valueForm }) {
  const dispatch = useDispatch()
  const { t } = useTranslation('home')
  const language = useSelector((state) => state.consentsSlice.language)
  const [openMic, setOpenMic] = useState(false)
  const [isSave, setIsSave] = useState(false)
  const [transcript, setTranscript] = useState('')

  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)()

  recognition.lang = language || 'en-US'
  recognition.interimResults = false
  recognition.maxAlternatives = 1

  recognition.onresult = (event) => {
    const result = event.results[0][0].transcript
    setTranscript(result)
  }

  const startListening = () => {
    if (!speaking) {
      recognition.start()
    }
  }

  // const stopListening = () => {
  //   recognition.stop()
  // }

  const handleSpeech = async () => {
    if (!speaking) {
      if (!openMic) {
        startListening()
        setTimeout(() => {
          setOpenMic(true)
        }, TIME_END_SPEECH)
      } else {
        setOpenMic(false)
        setTranscript('')
        startListening()
        setTimeout(() => {
          setOpenMic(true)
        }, TIME_END_SPEECH)
      }
    }
  }

  return (
    <>
      {!isSave && (
        <>
          <p className='consent-text'>{t('content')}</p>
          <p className='consent-text'>{t('question')}</p>

          <div
            className={`detail-consent-btn${
              speaking ? ' detail-consent-disable-btn' : ''
            }`}
          >
            {!openMic && (
              <Button
                title=''
                icon={<IconMic />}
                onlyIcon
                onClick={handleSpeech}
              />
            )}
          </div>
          {openMic && (
            <>
              <div className='detail-speech-btn'>
                <Button
                  title=''
                  icon={!speaking ? <IconPause /> : <IconPlay />}
                  onlyIcon
                  onClick={() => {
                    if (transcript.length > 0) {
                      speak(transcript)
                    } else {
                      return false
                    }
                  }}
                />
                {transcript.length > 0 ? (
                  <p className='text-response'>You responded "{transcript}"</p>
                ) : (
                  <p className='text-response'>You have not responded yet</p>
                )}
              </div>
              <div className='detail-speech-bottom'>
                <Button
                  title='Retry'
                  icon={<IconReplay />}
                  onClick={handleSpeech}
                />
                {transcript.length > 0 && (
                  <Button
                    title='Save'
                    icon={<IconArrowRight />}
                    onClick={() => {
                      dispatch(
                        addConsent({
                          ...valueForm,
                          transcript
                        })
                      )
                      setIsSave(true)
                    }}
                  />
                )}
              </div>
            </>
          )}
        </>
      )}

      {isSave && <Success />}
    </>
  )
}

export default Consent
