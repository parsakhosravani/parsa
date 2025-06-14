"use client";
import { useEffect, useState } from "react";
import { useMousePosition } from "../../util/mouse";

interface Star {
    id: number;
    x: number;
    y: number;
    opacity: number;
    scale: number;
    life: number;
}

interface Explosion {
    id: number;
    x: number;
    y: number;
    particles: ExplosionParticle[];
}

interface ExplosionParticle {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    opacity: number;
    scale: number;
    life: number;
    color: string;
}

export function StarlightCursor() {
    const mousePosition = useMousePosition();
    const [stars, setStars] = useState<Star[]>([]);
    const [explosions, setExplosions] = useState<Explosion[]>([]);
    const [isMoving, setIsMoving] = useState(false);

    useEffect(() => {
        let moveTimeout: NodeJS.Timeout;

        const handleMouseMove = () => {
            setIsMoving(true);
            clearTimeout(moveTimeout);
            moveTimeout = setTimeout(() => setIsMoving(false), 100);
        };

        const handleClick = (e: MouseEvent) => {
            // Create explosion at click position
            const particles: ExplosionParticle[] = [];
            const colors = ['#ffffff', '#fbbf24', '#f59e0b', '#d97706', '#92400e'];

            for (let i = 0; i < 15; i++) {
                const angle = (i / 15) * Math.PI * 2;
                const velocity = Math.random() * 3 + 2;
                particles.push({
                    id: i,
                    x: e.clientX,
                    y: e.clientY,
                    vx: Math.cos(angle) * velocity,
                    vy: Math.sin(angle) * velocity,
                    opacity: 1,
                    scale: Math.random() * 0.8 + 0.4,
                    life: 100,
                    color: colors[Math.floor(Math.random() * colors.length)]
                });
            }

            setExplosions(prev => [...prev, {
                id: Date.now(),
                x: e.clientX,
                y: e.clientY,
                particles
            }]);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
            clearTimeout(moveTimeout);
        };
    }, []);

    useEffect(() => {
        if (!isMoving) return;

        // Add new stars when mouse moves
        const newStars: Star[] = [];
        for (let i = 0; i < 3; i++) {
            newStars.push({
                id: Date.now() + i,
                x: mousePosition.x + (Math.random() - 0.5) * 20,
                y: mousePosition.y + (Math.random() - 0.5) * 20,
                opacity: 1,
                scale: Math.random() * 0.5 + 0.5,
                life: 100,
            });
        }

        setStars(prev => [...prev, ...newStars]);
    }, [mousePosition, isMoving]);

    // Animate stars
    useEffect(() => {
        const interval = setInterval(() => {
            setStars(prev =>
                prev
                    .map(star => ({
                        ...star,
                        life: star.life - 2,
                        opacity: star.life / 100,
                        scale: star.scale * 0.98,
                    }))
                    .filter(star => star.life > 0)
            );
        }, 16);

        return () => clearInterval(interval);
    }, []);

    // Animate explosions
    useEffect(() => {
        const interval = setInterval(() => {
            setExplosions(prev =>
                prev
                    .map(explosion => ({
                        ...explosion,
                        particles: explosion.particles
                            .map(particle => ({
                                ...particle,
                                x: particle.x + particle.vx,
                                y: particle.y + particle.vy,
                                vy: particle.vy + 0.1, // gravity
                                life: particle.life - 2,
                                opacity: particle.life / 100,
                                scale: particle.scale * 0.99,
                            }))
                            .filter(particle => particle.life > 0)
                    }))
                    .filter(explosion => explosion.particles.length > 0)
            );
        }, 16);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {/* Main cursor glow */}
            <div
                className="absolute w-4 h-4 bg-zinc-300 rounded-full opacity-50 blur-sm transition-opacity duration-200"
                style={{
                    left: mousePosition.x - 8,
                    top: mousePosition.y - 8,
                    opacity: isMoving ? 0.8 : 0.2,
                }}
            />

            {/* Center dot */}
            <div
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                    left: mousePosition.x - 2,
                    top: mousePosition.y - 2,
                }}
            />

            {/* Stars trail */}
            {stars.map(star => (
                <div
                    key={star.id}
                    className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                    style={{
                        left: star.x,
                        top: star.y,
                        opacity: star.opacity,
                        transform: `scale(${star.scale})`,
                        boxShadow: `0 0 ${star.scale * 4}px rgba(255, 255, 255, ${star.opacity})`,
                    }}
                />
            ))}

            {/* Explosion particles */}
            {explosions.map(explosion =>
                explosion.particles.map(particle => (
                    <div
                        key={`${explosion.id}-${particle.id}`}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                            left: particle.x - 4,
                            top: particle.y - 4,
                            opacity: particle.opacity,
                            transform: `scale(${particle.scale})`,
                            backgroundColor: particle.color,
                            boxShadow: `0 0 ${particle.scale * 8}px ${particle.color}`,
                        }}
                    />
                ))
            )}

            {/* Sparkle particles */}
            {isMoving && (
                <>
                    <div
                        className="absolute w-2 h-2 animate-ping"
                        style={{
                            left: mousePosition.x - 4,
                            top: mousePosition.y - 4,
                        }}
                    >
                        <div className="w-full h-full bg-zinc-300 rounded-full opacity-30"></div>
                    </div>
                    <div
                        className="absolute w-3 h-3 animate-ping animation-delay-75"
                        style={{
                            left: mousePosition.x - 6,
                            top: mousePosition.y - 6,
                        }}
                    >
                        <div className="w-full h-full bg-zinc-400 rounded-full opacity-20"></div>
                    </div>
                </>
            )}
        </div>
    );
}