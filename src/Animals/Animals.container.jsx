import React, { useState, createRef, useRef } from 'react'

import './animals.css'
import { useAnimals } from './hooks/animals.hook'
import Table from '../common/components/Table.component'
import Modal from '../common/components/Modal'
import Loading from '../common/components/Loading'

export default function AnimalsContainer() {
  const {
    animals,
    loading,
    error,
    deleteAnimals,
    addAnimal,
  } = useAnimals()
  const [modal, setModal] = useState(false)
  const [animal, setAnimal] = useState({
    common_name: '',
    scientific_name: '',
    quantity: 0,
  })
  const commonName = useRef(null)
  const scientificName = useRef(null)
  const quantity = useRef(null)

  const toggleModal = () => setModal(prevState => !prevState)
  const onChangeText = label => event => setAnimal(prevState => ({
    ...prevState,
    [label]: event.target?.value,
  }))
  const onSubmitAnimal = event => {
    event.preventDefault()

    if (
      animal.common_name.trim().length
      && animal.scientific_name.trim().length
      && !isNaN(parseInt(animal.quantity.trim()))
    ) {

      commonName.current.value = ''
      scientificName.current.value = ''
      quantity.current.value = ''
      toggleModal()

      return addAnimal(animal)
    }

    alert('Debe ingresar todos los campos')
  }

  if (loading) {
    return (
      <div className='content-loading'>
        <Loading />
      </div>
    )
  }

  return (
    <React.Fragment>
      {error && (
        <div>
          Hubo un error: {error.message} 
        </div>
      )}
      <div className='content-button'>
        <button onClick={toggleModal} className='btn-primary'>
          {'Agregar animal'}
        </button>
      </div>
      <div class='content-table'>
        <Table
          headers={[
            { title: 'Nombre', key: 'common_name' },
            { title: 'Nombre Cientifico', key: 'scientific_name' },
            { title: 'Cantidad', key: 'quantity' },
          ]}
          data={animals}
          actions={animal => (
            <button className='button-large' onClick={() => deleteAnimals(animal.id)}>
              Eliminar
            </button>
          )}
        />
      </div>
      <Modal
        title='Agregar animal'
        show={modal}
        onClose={toggleModal}
      >
        <form className='form-add-animal' onSubmit={onSubmitAnimal}>
          <div className='form-add-animal__field'>
            <label>Nombre</label>
            <input
              type='text'
              name='common_name'
              onChange={onChangeText('common_name')}
              ref={commonName}
            />
          </div>
          <div className='form-add-animal__field'>
            <label>Nombre cientifico</label>
            <input
              type='text'
              name='scientific_name'
              onChange={onChangeText('scientific_name')}
              ref={scientificName}
            />
          </div>
          <div className='form-add-animal__field'>
            <label>Cantidad</label>
            <input
              type='number'
              name='quantity'
              min={0}
              onChange={onChangeText('quantity')}
              ref={quantity}
            />
          </div>
          <div className='form-add-animal__field'>
            <button className='btn-primary' type='submit'>
              {'Agregar'}
            </button>
          </div>
        </form>
      </Modal>
    </React.Fragment>
  )
}
