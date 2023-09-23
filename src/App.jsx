import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { MeshDistortMaterial, useTexture } from '@react-three/drei'
import { easing } from 'maath'
import { inject } from '@vercel/analytics'

import GithubLogo from './assets/github-mark.svg'

inject()

function Image({ url, ...props }) {
  const ref = useRef()
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const texture = useTexture(url)

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto'

    return () => (document.body.style.cursor = 'auto')
  }, [isHovered])

  useFrame((state, delta) => {
    easing.damp(
      ref.current.material,
      'distort',
      isHovered ? 0.5 : 0,
      0.25,
      delta
    )
    easing.damp3(ref.current.scale, isClicked ? 3 : 2, 0.25, delta)
  })

  return (
    <mesh
      ref={ref}
      {...props}
      onClick={(e) => {
        e.stopPropagation()
        setIsClicked(!isClicked)
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setIsHovered(true)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setIsHovered(false)
      }}
    >
      <planeGeometry args={[1, 1.33, 64, 64]} />
      <MeshDistortMaterial map={texture} speed={4} toneMapped={false} />
    </mesh>
  )
}

function App() {
  return (
    <>
      <Canvas>
        <ambientLight intensity={4} />
        <Image url='/IMG_0285.jpeg' position={[-2.1, 0, 0]} />
        <Image url='/IMG_0220.jpeg' position={[2.1, 0, 0]} />
        <Image url='/IMG_0630.jpeg' position={[4.2, 0, 0]} />
        <Image url='/IMG_1709.jpeg' position={[-4.2, 0, 0]} />
        <Image url='/IMG_0632.jpeg' position={[0, 0, 0]} />
      </Canvas>
      <div>
        <p className='header'>Awesome Effect</p>
        <p className='footer'>Awwwards Ready</p>
        <a
          href='https://github.com/titungdup/r3f-image-effect'
          className='github-link'
        >
          <img src={GithubLogo} />
        </a>
      </div>
      <div></div>
    </>
  )
}

export default App
