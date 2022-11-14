import React, { useEffect } from 'react'
import { usePlane } from '@react-three/cannon'
import { groundTexture } from '../images/textures'
import { RepeatWrapping, NearestFilter } from 'three'
import useStore from './../hooks/useStore'

function Ground() {

    const [groundRef] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, -0.5, 0],
    }))

    const [addCube] = useStore((state) => [state.addCube])

    const groundSize = [100, 100]

    useEffect(() => {
        groundTexture.wrapS = RepeatWrapping
        groundTexture.wrapT = RepeatWrapping
        groundTexture.repeat.set(groundSize[0], groundSize[1])

        groundTexture.magFilter = NearestFilter
    }, [])



    return (
        <mesh
            ref={groundRef}
            onClick={(e) => {
                e.stopPropagation()
                const [x, y, z] = Object.values(e.point).map(val => Math.ceil(val))
                addCube(x, y, z)
            }}
        >
            <planeBufferGeometry attach='geometry' args={groundSize} />
            <meshStandardMaterial attach='material' map={groundTexture} />
        </mesh>
    )
}

export default Ground