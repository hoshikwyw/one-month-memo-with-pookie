import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

/* ── Inner R3F scene component ─────────────────────────────── */
function Lizard() {
  const { scene } = useGLTF('/lizard.glb')
  const meshRef   = useRef()
  const spinning  = useRef(false)
  const spinTime  = useRef(0)

  useFrame(({ clock }, delta) => {
    if (!meshRef.current) return
    const t = clock.elapsedTime

    if (spinning.current) {
      spinTime.current += delta
      meshRef.current.rotation.y += delta * 15
      meshRef.current.scale.setScalar(1 + Math.abs(Math.sin(spinTime.current * 18)) * 0.25)
      if (spinTime.current >= 0.7) {
        spinning.current = false
        spinTime.current = 0
        meshRef.current.scale.setScalar(1)
      }
    } else {
      // idle: gentle floating bob + subtle breathing scale
      meshRef.current.position.y = Math.sin(t * 1.4) * 0.08
      meshRef.current.scale.setScalar(1 + Math.sin(t * 2.5) * 0.022)
    }
  })

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={1.8}
      position={[0, 0, 0]}
      onClick={(e) => {
        e.stopPropagation()
        spinning.current = true
        spinTime.current = 0
      }}
    />
  )
}

/* ── Fixed viewport sidekick ───────────────────────────────── */
export default function LizardViewer() {
  return (
    <div
      style={{
        position     : 'fixed',
        bottom       : '72px',
        right        : '8px',
        width        : '110px',
        height       : '110px',
        zIndex       : 50,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        style={{ pointerEvents: 'auto' }}
        camera={{ position: [0, 0.5, 3.5], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight     intensity={2.5} />
        <directionalLight position={[4, 6, 4]}  intensity={3} />
        <directionalLight position={[-3, 3, 2]} intensity={1.2} color="#ffb6c1" />
        <pointLight       position={[0, 4, 2]}  intensity={1.8} color="#ffe4e1" />
        <Suspense fallback={null}>
          <Lizard />
        </Suspense>
      </Canvas>
    </div>
  )
}

useGLTF.preload('/lizard.glb')
