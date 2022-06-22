
import React, { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import {Environment} from '@react-three/drei'
import lightsEnvironment from './assets/lights.hdr'
import Model from './components/Model'
import { OrbitControls } from '@react-three/drei'

import './App.css' 

export default function App() {

  const debug = false;
  const controls = useRef();

  return (
    <>
      <Canvas camera={{ position: [0, 40, 40] }}>
        <ambientLight intensity={0.1} />
        <spotLight intensity={0.8} position={[300, 300, 400]} />
        <Suspense>
          <Model />
          <Environment files= {lightsEnvironment} />
          {debug && <OrbitControls/>}
        </Suspense>
      </Canvas>
    </>
  )
}