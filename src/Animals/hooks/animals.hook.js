import {
  useState,
  createContext,
  useEffect,
  useContext,
} from 'react'
import { v1 as UUID } from 'uuid'

const API_URL = 'http://localhost:3200/api/animals'

const AnimalsContext = createContext({
  animals: [],
  loading: true,
  error: null,
  deleteAnimals: async () => { },
  addAnimal: async () => { },
})

const AnimalsProvider = ({ children }) => {
  const [animals, setAnimals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const findAnimals = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('http://localhost:3200/api/animals')
      const animalsParsed = await response.json()

      setAnimals(animalsParsed)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const deleteAnimals = async animalID => {
    try {
      setAnimals(prevAnimals => prevAnimals.filter(animal => animal.id !== animalID))

      const response = await fetch(`${API_URL}/${animalID}`, { method: 'DELETE' })
      const { isDeleted } = await response.json() || {}

      if (isDeleted) {
        alert('¡ha sido eliminado correctamente!')
      }
    } catch (error) {
      setError(error)
    }
  }

  const addAnimal = async animal => {
    try {
      const id = UUID()
      setAnimals(prevAnimals => prevAnimals.concat({ id, ...animal }))

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(animal),
      })
      const newAnimal = await response.json()

      setAnimals(prevAnimals => prevAnimals.map(animal => animal.id === id ? newAnimal : animal))
    } catch (error) {
      setError(error)
    }
  }

  useEffect(() => {
    findAnimals()
  }, [])

  const data = {
    animals,
    loading,
    error,
    deleteAnimals,
    addAnimal,
  }

  return (
    <AnimalsContext.Provider value={data}>
      {children}
    </AnimalsContext.Provider>
  )
}

const useAnimals = () => {
  const context = useContext(AnimalsContext)

  if (!context) {
    throw new Error('error ')
  }

  return context
}

export { useAnimals, AnimalsProvider }
