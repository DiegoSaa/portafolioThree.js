
import React, { useEffect } from 'react';
import model from '../assets/portafolioScene.glb'
import teclado from '../assets/teclado.glb'
import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap';

gsap.ticker.fps(100);

export default function Model() {

  const gltf = useGLTF(model); // load the scene
  const {nodes} = useGLTF(teclado); // load the keyboard model

  const yKeys = nodes.q.position.y; //initial height of the key
  const keyPress = (key) => key === ' ' ? "Space" : key; 

  const { camera } = useThree();


  useEffect(() => {
    console.log("camera: ", camera);
    camera.rotation.x = 0;
    camera.rotation.y = 0;
    camera.rotation.z = 0;

    gsap.to(camera.position, {
      z: 35,
      y:35,
      x: -5,
      duration: 5
    });
    gsap.to(camera.rotation, {
      z: 0,
      y: 0,
      x: -0.7,
      duration: 5
    });

  }, []) 

  useEffect(() => {
    const handleKeyDown = (e) => {
      console.log("e: ", e);
      nodes[keyPress(e.key)].position.y= yKeys - 0.2 ;
    }
    const handleKeyUp = (e) => {
      nodes[keyPress(e.key)].position.y= yKeys;
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  

  return (
    <group>
      <primitive object={gltf.scene} />
      {
      Object.keys(nodes || []).map( (node, index) => {
        console.log(nodes[node]);
        return (
          <primitive
            key={index}
            object={nodes[node]}
          />)
        })
      }
      

    </group>
  )
}
