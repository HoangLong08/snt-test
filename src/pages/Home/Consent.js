import React, { useState } from 'react'
import { IconMic } from 'assets'
import Button from 'components/Button'
import { useTranslation } from 'react-i18next'
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition'
import { IconArrowRight, IconPause, IconPlay, IconReplay } from 'assets/index'
import Success from './Success'
import { useDispatch } from 'react-redux'
import { addConsent } from 'store/consents/consent.reducer'

const TIME_END_SPEECH = 4000

function Consent({ speaking, speak, valueForm }) {
  const dispatch = useDispatch()
  const { t } = useTranslation('home')
  const [openMic, setOpenMic] = useState(false)
  const [isSave, setIsSave] = useState(false)
  const { transcript } = useSpeechRecognition()

  const handleSpeech = async () => {
    if (!openMic) {
      await SpeechRecognition.startListening()
      setTimeout(() => {
        setOpenMic(true)
      }, TIME_END_SPEECH)
    } else {
      setOpenMic(false)
      await SpeechRecognition.startListening()
      setTimeout(() => {
        setOpenMic(true)
      }, TIME_END_SPEECH)
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
                    speak({ text: transcript })
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
