import React from 'react'
import Lottie from 'react-lottie'

import AnimalLoading from '../../../assets/animal-loading.json'

export default function Loading({ width = 300, height = 300 }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: AnimalLoading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <Lottie
      options={defaultOptions}
      height={height}
      width={width}
    />
  )
}
