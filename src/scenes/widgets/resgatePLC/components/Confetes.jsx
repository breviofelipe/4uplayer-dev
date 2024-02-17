import React, { useRef } from 'react'

import Confetti from 'react-confetti'

const Confetes = () => {
    const windowSize = useRef({width : window.innerWidth, height : window.innerHeight });
  const { width, height } = windowSize;
  return (
    <Confetti
      width={width}
      height={height}
    />
  )
}

export default Confetes;