"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useEffect, useState } from "react"

function AnimatedStat({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 })
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    if (!isVisible) return
    const numericPart = parseInt(value)
    const suffix = value.replace(/\d/g, "")
    const duration = 1500
    const steps = 40
    const stepTime = duration / steps
    let current = 0

    const timer = setInterval(() => {
      current += 1
      const progress = current / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.round(eased * numericPart)
      setDisplayValue(currentValue + suffix)
      if (current >= steps) clearInterval(timer)
    }, stepTime)

    return () => clearInterval(timer)
  }, [isVisible, value])

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-2 rounded-lg bg-primary-foreground/10 p-8 transition-all duration-500 hover:bg-primary-foreground/15 hover:scale-105"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <span className="text-4xl font-bold text-accent">{displayValue}</span>
      <span className="text-sm text-primary-foreground/70">{label}</span>
    </div>
  )
}

export function StorySection() {
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation()

  return (
    <section id="story" className="bg-primary px-4 py-20 md:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div ref={textRef}>
          <p
            className="text-sm font-serif tracking-[0.3em] uppercase text-accent transition-all duration-700"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateX(0)" : "translateX(-30px)",
            }}
          >
            Since 1897
          </p>
          <h2
            className="mt-3 text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl transition-all duration-700"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateX(0)" : "translateX(-30px)",
              transitionDelay: "150ms",
            }}
          >
            Our Story
          </h2>
          <p
            className="mt-6 text-base leading-relaxed text-primary-foreground/80 font-serif transition-all duration-700"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "300ms",
            }}
          >
            For over a century, our family has been dedicated to the art of
            chocolate making. What began as a small atelier in the heart of
            Paris has grown into a celebrated maison, yet our philosophy
            remains unchanged.
          </p>
          <p
            className="mt-4 text-base leading-relaxed text-primary-foreground/80 font-serif transition-all duration-700"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "450ms",
            }}
          >
            We source the finest cacao beans from single-origin estates across
            Ecuador, Madagascar, and Venezuela. Each batch is roasted,
            ground, and tempered by hand, preserving the unique terroir of
            every harvest.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <AnimatedStat value="127" label="Years of Craft" delay={0} />
          <AnimatedStat value="12" label="Master Chocolatiers" delay={150} />
          <AnimatedStat value="8" label="Origin Estates" delay={300} />
          <AnimatedStat value="50+" label="Unique Creations" delay={450} />
        </div>
      </div>
    </section>
  )
}
