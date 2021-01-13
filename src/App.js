import React from 'react'

import AnimalsContainer from './Animals/Animals.container'
import NavBar from './common/components/NavBar.component'

import { AnimalsProvider } from './Animals/hooks/animals.hook'

function App() {
  return (
    <AnimalsProvider>
      <header>
        <NavBar />
      </header>
      <section>
        <AnimalsContainer />
      </section>
    </AnimalsProvider>
  )
}

export default App
