import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import './modal.css'

export default function ModalComponent(props) {
  const {
    title,
    footerButtons,
    children,
    onClose,
    show,
  } = props

  if (!show) return null

  return (
    <div className='modal-container'>
      <div className='modal-container__content'>
        <div className='content-modal'>
          <div className='content-modal__header'>
            <div className='content-modal__header__title'>
              {title}
            </div>
            <div className='content-modal__header__button'>
              <button onClick={onClose}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
          <div className='content-modal__body'>
            {children}
          </div>
          <div className='content-modal__footer'>
            <button className='footer-close-button' onClick={onClose}>
              {'Cerrar'}
            </button>
            {footerButtons}
          </div>
        </div>
      </div>
    </div>
  )
}
