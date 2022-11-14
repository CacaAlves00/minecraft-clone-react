import { useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { Vector3 } from 'three'
import useKeyboard from '../hooks/useKeyboard'

function Player() {
    const actions = useKeyboard()
    const { camera } = useThree()
    const [sphereRef, api] = useSphere(() => ({
        mass: 100,
        type: 'Dynamic',
        position: [0, 0.5, 0,]
    }))

    const position = useRef([0, 0, 0])
    const velocity = useRef([0, 0, 0])

    const JUMP_FORCE = 6
    const SPEED = 4

    useEffect(() => {
        api.position.subscribe((p) => {
            position.current = p
        })
    }, [api.position])

    useEffect(() => {
        api.velocity.subscribe((v) => {
            velocity.current = v
        })
    }, [api.velocity])


    useFrame(() => {
        camera.position.copy(new Vector3(...position.current))

        movePlayer()
    })

    function movePlayer() {


        const frontVector = new Vector3(
            0,
            0,
            (actions.moveBackward ? 1 : 0) - (actions.moveForward ? 1 : 0)
        )

        const sideVector = new Vector3(
            (actions.moveLeft ? 1 : 0) - (actions.moveRight ? 1 : 0),
            0,
            0
        )

        const direction = new Vector3()
        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation)

        api.velocity.set(direction.x, velocity.current[1], direction.z)

        if (actions['jump'] === true && Math.abs(velocity.current[1]) < 0.01)
            api.velocity.set(velocity.current[0], JUMP_FORCE, velocity.current[2])
    }

    return (
        <mesh ref={sphereRef}>

        </mesh>
    )
}

export default Player