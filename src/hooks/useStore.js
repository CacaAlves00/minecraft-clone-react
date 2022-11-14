import React from 'react'
import create from 'zustand'
import { nanoid } from 'nanoid'

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key))
const setLocalStorage = (key, val) => window.localStorage.setItem(key,
    JSON.stringify(val)
)


export default create((set) => ({
    texture: 'dirt',
    cubes:
        getLocalStorage('cubesMinecraftReactClone') || [],
    addCube: (x, y, z) => {
        set((prev) => ({
            cubes: [
                ...prev.cubes,
                {
                    key: nanoid(),
                    pos: [x, y, z],
                    texture: prev.texture
                }
            ]
        }))
    },
    removeCube: (x, y, z) => {
        set((prev) => ({
            cubes: prev.cubes.filter(cube => {
                const [X, Y, Z] = cube.pos
                return X !== x || Y !== y || Z !== z
            })

        }))
    },
    setTexture: (texture) => {
        set(() => ({
            texture
        }))
    },

    saveWorld: () => {
        set((prev) => {
            setLocalStorage('cubesMinecraftReactClone', prev.cubes)
            return prev
        })
    },
    resetWorld: () => {
        set(() => ({
            cubes: []
        }))
    },
}))