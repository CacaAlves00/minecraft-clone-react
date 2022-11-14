import { Physics } from '@react-three/cannon'
import { Sky } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import './App.css'
import Cubes from './components/Cubes'
import FPV from './components/FPV'
import Ground from './components/Ground'
import Player from './components/Player'
import Menu from './components/Menu'
import TextureSelector from './components/TextureSelector'

function App() {
  return (
    <>
      {/* <div>Outside canvas</div> */}

      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />

        <ambientLight intensity={0.5} />

        <FPV />      

        <Physics>
          <Player />
          <Ground />
          <Cubes />
        </Physics>
      </Canvas>

      <div className='absolute centered cursor'>+</div>
      <TextureSelector />
      
      <Menu />
    </>
  )
}

export default App
