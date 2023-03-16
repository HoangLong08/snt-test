import { IconChecked, IconClose, IconPause, IconPlay } from 'assets/index'
import Button from 'components/Button/index'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useSpeechSynthesis } from 'react-speech-kit'
import './style.css'

function Contents() {
  const listConsents = useSelector((state) => state.consentsSlice.listConsents)
  const [idx, setIdx] = useState()
  const { speak, speaking } = useSpeechSynthesis()
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
              listConsents?.map((item, index) => (
                <tr key={'consent' + index}>
                  <th className='column-detail'>
                    <p className='table-text-name'>{item.name}</p>
                    <p className='table-text-language'>
                      Language:{' '}
                      {item.language === 'en-US' ? 'English' : 'French'}
                    </p>
                  </th>
                  <th className='column-consent'>
                    {item.transcript?.toLowerCase()?.replace(/\./g, '') ===
                      'no' ||
                    item.transcript?.toLowerCase()?.replace(/\./g, '') ===
                      'non' ? (
                      <IconChecked />
                    ) : (
                      <IconClose />
                    )}
                  </th>
                  <th className='column-given'>
                    <Button
                      onlyIcon
                      icon={
                        speaking && idx === index ? <IconPlay /> : <IconPause />
                      }
                      onClick={() => {
                        setIdx(index)
                        speak({ text: item.transcript })
                      }}
                    />
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Contents
