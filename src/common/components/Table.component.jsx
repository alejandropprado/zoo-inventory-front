import React from 'react'

import './table.css'

export default function TableComponent({ headers = [], data = [], actions = [] }) {
  const cellWidth = `${100 / headers.length}%`
  const allHeaders = headers.concat(actions)

  return (
    <div className='wrapper'>
      <div className='Rtable Rtable--collapse'>
        <div className='Rtable-row Rtable-row--head'>
          {headers.map((head, index) =>
            <div
              key={index}
              className={`Rtable-cell ${index === 0 ? 'fist-cell' : ''} column-heading`}
              style={{ width: cellWidth }}
            >
              {head.title}
            </div>
          )}
          {actions.length > 0 && (
            <div
              className={`Rtable-cell column-heading`}
              style={{ width: cellWidth }}
            >
              Acciones
            </div>
          )}
        </div>
        {data.length === 0 && (
          <div className='Rtable-row without-data'>
            SIN DATOS PARA MOSTRAR
          </div>
        )}
        {data.map((obj, objIndex) => (
          <div className='Rtable-row' key={objIndex}>
            {allHeaders.map((head, headIndex) => {
              const isActions = headIndex === allHeaders.length - 1

              if (headIndex === 0) {
                return (
                  <div
                    key={`${objIndex}-${headIndex}`}
                    className='Rtable-cell fist-cell'
                    style={{ width: cellWidth }}
                  >
                    <div className='Rtable-cell--content'>
                      <span>
                        {obj[head.key]}
                      </span>
                    </div>
                  </div>
                )
              }


              return (
                <div
                  key={`${objIndex}-${headIndex}`}
                  className='Rtable-cell'
                  style={{ width: cellWidth }}
                >
                  <div className='Rtable-cell--heading'>
                    {!isActions ? head.title : 'Acciones'}
                  </div>
                  <div className='Rtable-cell--content title-content'>
                    {!isActions
                      ? obj[head.key]
                      : typeof head === 'function' && head(obj)}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
