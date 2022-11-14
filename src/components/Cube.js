import React from 'react'
import { useBox } from '@react-three/cannon'
import * as textures from './../images/textures'
import useStore from '../hooks/useStore'

function Cube({ pos, texture }) {

    const [ref] = useBox(() => ({
        type: 'Static',
        position: pos
    }))

    const activeTexture = textures[texture + 'Texture']

    const [addCube, removeCube] = useStore((state) => [
        state.addCube, state.removeCube
    ])

    return (
        <mesh
            ref={ref}
            onClick={(e) => {
                e.stopPropagation()
                const clickedFace = Math.floor(e.faceIndex / 2)
                const { x, y, z } = ref.current.position

                if (e.altKey) {
                    removeCube(x, y, z)
                    return
                }

                switch (clickedFace) {
                    case 0:
                        addCube(x + 1, y, z)
                        break;
                    case 1:
                        addCube(x - 1, y, z)
                        break
                    case 2:
                        addCube(x, y + 1, z)
                        break
                    case 3:
                        addCube(x, y - 1, z)
                        break
                    case 4:
                        addCube(x, y, z + 1)
                        break
                    case 5:
                        addCube(x, y, z - 1)
                        break

                    default:
                }

                // const [x, y, z] = Object.values(e.point).map(val => Math.ceil(val))
                // addCube(x, y, z)
            }}
            on
        >
            <boxBufferGeometry attach='geometry' />
            <meshStandardMaterial map={activeTexture} attach='material' />
        </mesh>
    )
}

export default Cube