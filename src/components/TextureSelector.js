import React, { useEffect, useState } from 'react'
import useKeyboard from '../hooks/useKeyboard'
import useStore from '../hooks/useStore'
import * as images from './../images'

function TextureSelector() {

    const [visible, setVisible] = useState(false)
    const [activeTexture, setTexture] = useStore((state) => [
        state.texture,
        state.setTexture
    ])
    const {
        dirt,
        grass,
        glass,
        wood,
        log
    } = useKeyboard()

    useEffect(() => {
        const visibilityTimeout = setTimeout(() => {
            setVisible(false)
        }, 2000)
        setVisible(true)

        return () => {
            clearTimeout(visibilityTimeout)
        }
    }, [activeTexture])

    useEffect(() => {
        const textures = { dirt, grass, glass, wood, log }
        const pressedTexture = Object.entries(textures)
            .find(([k, v]) => v == true)

        if (pressedTexture) {
            setTexture(pressedTexture[0])
            console.log(pressedTexture[0])
        }
    }, [dirt, grass, glass, wood, log])

    return visible && (
        <div className='absolute centered texture-selector'>
            {
                Object.entries(images).map(([k, src]) => (
                    <img
                        key={k}
                        src={src}
                        alt={k}
                        className={`${k.slice(0, -3) === activeTexture ?
                            'active-texture' : ''}`}
                    />
                ))
            }
        </div>
    )
}

export default TextureSelector