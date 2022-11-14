import React from 'react'
import useStore from '../hooks/useStore'
import Cube from './Cube'

function Cubes() {

    const [cubes] = useStore((state) => [
        state.cubes
    ])

    return cubes.map((cube) => (
        <Cube key={cube.key} {...cube}/>
    ))
}

export default Cubes