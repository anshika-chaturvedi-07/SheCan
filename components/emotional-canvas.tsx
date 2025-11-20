'use client'

import { useEffect, useRef, useCallback } from 'react'

interface VisualParams {
  colors: string[]
  speed: number
  rhythm: 'smooth' | 'pulsing' | 'erratic'
  density: number
  shape: 'curves' | 'lines' | 'circles'
  energy: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  angle: number
  angleSpeed: number
  life: number
}

interface EmotionalCanvasProps {
  emotion?: string
}

export function EmotionalCanvas({ emotion = 'calm' }: EmotionalCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const timeRef = useRef(0)
const particlesRef = useRef<Particle[]>([])
  const getVisualParams = (emotion: string): VisualParams => {
    const patterns: Record<string, VisualParams> = {
      happy: { colors: ['#A985FF', '#00D696', '#FACC00'], speed: 0.7, rhythm: 'smooth', density: 0.8, shape: 'curves', energy: 0.9 },
      excited: { colors: ['#FF4D50', '#FACC00', '#A985FF'], speed: 0.8, rhythm: 'pulsing', density: 0.9, shape: 'circles', energy: 0.9 },
      calm: { colors: ['#A985FF', '#00D696', '#0099FF'], speed: 0.3, rhythm: 'smooth', density: 0.5, shape: 'curves', energy: 0.4 },
      focused: { colors: ['#0099FF', '#A985FF', '#00D696'], speed: 0.5, rhythm: 'smooth', density: 0.6, shape: 'lines', energy: 0.6 },
      default: { colors: ['#A985FF', '#00D696', '#0099FF'], speed: 0.5, rhythm: 'smooth', density: 0.5, shape: 'curves', energy: 0.5 }
    }
    return patterns[emotion.toLowerCase()] || patterns.default
  }

  const visualParams = getVisualParams(emotion)

  const initializeParticles = useCallback((canvas: HTMLCanvasElement) => {
    const numParticles = Math.floor(visualParams.density * 100)
    particlesRef.current = Array.from({ length: numParticles }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * visualParams.speed * 3,
      vy: (Math.random() - 0.5) * visualParams.speed * 3,
      size: Math.random() * 2 + 1,
      angle: Math.random() * Math.PI * 2,
      angleSpeed: (Math.random() - 0.5) * 0.02,
      life: Math.random()
    }))
  }, [visualParams])

  const animate = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    timeRef.current += 0.016 * visualParams.speed

    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    particlesRef.current.forEach((particle, index) => {
      if (visualParams.rhythm === 'smooth') {
        particle.x += particle.vx
        particle.y += particle.vy
      } else if (visualParams.rhythm === 'pulsing') {
        const pulse = Math.sin(timeRef.current * 2)
        particle.x += particle.vx * (1 + pulse * 0.5)
        particle.y += particle.vy * (1 + pulse * 0.5)
      } else {
        particle.x += particle.vx + (Math.random() - 0.5) * visualParams.energy * 2
        particle.y += particle.vy + (Math.random() - 0.5) * visualParams.energy * 2
      }

      if (particle.x < 0) particle.x = canvas.width
      if (particle.x > canvas.width) particle.x = 0
      if (particle.y < 0) particle.y = canvas.height
      if (particle.y > canvas.height) particle.y = 0

      particle.angle += particle.angleSpeed * visualParams.energy

      ctx.save()
      ctx.translate(particle.x, particle.y)
      ctx.rotate(particle.angle)

      const colorIndex = index % visualParams.colors.length
      const alpha = Math.floor(particle.life * 255).toString(16).padStart(2, '0')
      ctx.fillStyle = visualParams.colors[colorIndex] + alpha
      ctx.strokeStyle = visualParams.colors[colorIndex]
      ctx.lineWidth = 1

      if (visualParams.shape === 'curves') {
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.quadraticCurveTo(
          particle.size * 10,
          particle.size * 5 * Math.sin(timeRef.current + index),
          particle.size * 20,
          0
        )
        ctx.stroke()
      } else if (visualParams.shape === 'lines') {
        ctx.beginPath()
        ctx.moveTo(-particle.size * 10, 0)
        ctx.lineTo(particle.size * 10, 0)
        ctx.stroke()
      } else {
        ctx.beginPath()
        ctx.arc(0, 0, particle.size * 5, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()

      particle.life += 0.01
      if (particle.life > 1) {
        particle.life = 0
        particle.x = Math.random() * canvas.width
        particle.y = Math.random() * canvas.height
      }
    })

    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const p1 = particlesRef.current[i]
        const p2 = particlesRef.current[j]
        const dx = p1.x - p2.x
        const dy = p1.y - p2.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 80) {
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          const alpha = (1 - distance / 80) * 0.2 * visualParams.energy
          const alphaHex = Math.floor(alpha * 255).toString(16).padStart(2, '0')
          ctx.strokeStyle = visualParams.colors[0] + alphaHex
          ctx.stroke()
        }
      }
    }

    animationRef.current = requestAnimationFrame(() => animate(canvas, ctx))
  }, [visualParams])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initializeParticles(canvas)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    animate(canvas, ctx)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate, initializeParticles])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}
    />
  )
}
