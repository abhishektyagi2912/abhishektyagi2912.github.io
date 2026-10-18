import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Points, PointMaterial, Preload } from '@react-three/drei'
import * as THREE from 'three'
import { random } from 'maath'

type MouseState = { x: number; y: number }

function Particles({ count = 1800 }: { count?: number }) {
  const points = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    random.inSphere(arr, { radius: 9 })
    return arr
  }, [count])

  useFrame((_, delta) => {
    if (!points.current) return
    points.current.rotation.x -= delta / 28
    points.current.rotation.y -= delta / 38
  })

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled>
      <PointMaterial transparent color="#7dfff0" size={0.018} sizeAttenuation depthWrite={false} opacity={0.75} />
    </Points>
  )
}

function CoreBlob({ mouse }: { mouse: MouseState }) {
  const mesh = useRef<THREE.Mesh>(null!)
  const group = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (mesh.current) {
      mesh.current.rotation.x = t * 0.08
      mesh.current.rotation.y = t * 0.12
    }
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouse.x * 0.6, 0.04)
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -mouse.y * 0.4, 0.04)
    }
  })

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh ref={mesh} scale={1.85}>
          <icosahedronGeometry args={[1, 12]} />
          <MeshDistortMaterial
            color="#5eead4"
            attach="material"
            distort={0.45}
            speed={1.6}
            roughness={0.15}
            metalness={0.3}
            emissive="#2c7f74"
            emissiveIntensity={0.25}
          />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={1} floatIntensity={1.6} position={[2.6, 1.1, -1]}>
        <mesh scale={0.4}>
          <torusKnotGeometry args={[0.6, 0.18, 128, 16]} />
          <meshStandardMaterial color="#b084ff" roughness={0.25} metalness={0.5} emissive="#5b2fa3" emissiveIntensity={0.4} />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.2} position={[-2.8, -0.8, -0.5]}>
        <mesh scale={0.3}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#d4ff5e" roughness={0.3} metalness={0.4} emissive="#5f7a16" emissiveIntensity={0.3} />
        </mesh>
      </Float>
    </group>
  )
}

function PointerRig({ mouse }: { mouse: MouseState }) {
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', handler)
    return () => window.removeEventListener('pointermove', handler)
  }, [mouse])
  return null
}

export default function HeroScene() {
  const mouse = useRef<MouseState>({ x: 0, y: 0 }).current

  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.4} color="#7dfff0" />
      <pointLight position={[-5, -3, -5]} intensity={1.2} color="#b084ff" />
      <PointerRig mouse={mouse} />
      <CoreBlob mouse={mouse} />
      <Particles />
      <Preload all />
    </Canvas>
  )
}
