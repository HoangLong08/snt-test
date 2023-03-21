import { IconChecked, IconClose, IconPause, IconPlay } from 'assets/index'
import Button from 'components/Button/index'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './style.css'

function Contents() {
  const listConsents = useSelector((state) => state.consentsSlice.listConsents)
  const [idx, setIdx] = useState()
  // const { speak, speaking } = useSpeechSynthesis()
  const [speaking, setSpeaking] = useState(false)
  const speak = (str) => {
    setSpeaking(true)
    const utterance = new SpeechSynthesisUtterance(str)
    utterance.onend = () => {
      // alert('Audio playback finished.')
      setSpeaking(false)
    }
    window.speechSynthesis.speak(utterance)
  }
  return (
    <>
      <h2 className='head-title'>All Consents</h2>
      <div className='wrapper-form'>
        <table className='table'>
          <thead>
            <tr className='table-head'>
              <th className='column-detail'>Detail</th>
              <th className='column-consent'>Consent</th>
              <th className='column-given'>Given</th>
            </tr>
          </thead>
          <tbody>
            {listConsents?.length === 0 && (
              <tr className='consents-empty'>
                <th colSpan={3}>Consent Empty</th>
              </tr>
            )}
            {listConsents?.length !== 0 &&
              listConsents?.map((item, index) => {
                return (
                  <tr key={'consent' + index}>
                    <th className='column-detail'>
                      <p className='table-text-name'>{item.name}</p>
                      <p className='table-text-language'>
                        Language:{' '}
                        {item.language === 'en-US' ? 'English' : 'French'}
                      </p>
                    </th>
                    <th className='column-consent'>
                      {item.transcript
                        ?.toLowerCase()
                        ?.replace(/\./g, '')
                        ?.trim() === 'no' ||
                      item.transcript
                        ?.toLowerCase()
                        ?.replace(/\./g, '')
                        ?.trim() === 'non' ? (
                        <IconClose />
                      ) : (
                        <IconChecked />
                      )}
                    </th>
                    <th className='column-given'>
                      <Button
                        onlyIcon
                        icon={
                          speaking && idx === index ? (
                            <IconPlay />
                          ) : (
                            <IconPause />
                          )
                        }
                        onClick={() => {
                          setIdx(index)
                          speak(item.transcript)
                        }}
                      />
                    </th>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Contents
