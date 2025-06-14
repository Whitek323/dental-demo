import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import {
  ShieldLayers,
  ToothImage,
  HUD,
  Controls,
  EndScreen
} from './GameComponents';

const MAX_TIME = 120;
const PHASE_DURATION = 20;
const TOTAL_PHASES = 6;

interface Bacteria {
  el: HTMLImageElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const OldApp: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const [totalTime, setTotalTime] = useState(0);
  const [brushingTime, setBrushingTime] = useState(PHASE_DURATION);
  const [score, setScore] = useState(0);
  const [stack, setStack] = useState(0);
  const [paused, setPaused] = useState(false);
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState(0);
  const [toothImage, setToothImage] = useState('game/tooth/1.png');
  const [end, setEnd] = useState(false);
  const [rating, setRating] = useState('');

  const gameInterval = useRef<number | null>(null);
  const animationRef = useRef<number>();
  const bacteriaList = useRef<Bacteria[]>([]);
  const currentStack = useRef<number>(0);
  const spawnCounter = useRef<number>(0);

  useEffect(() => {
    currentStack.current = stack;
  }, [stack]);

  useEffect(() => {
    const currentPhase = Math.min(Math.floor(totalTime / PHASE_DURATION), TOTAL_PHASES - 1);
    setPhase(currentPhase);
    setToothImage(`game/tooth/${currentPhase + 1}.png`);
    setBrushingTime(PHASE_DURATION - (totalTime % PHASE_DURATION));

    if (totalTime >= MAX_TIME) {
      endGame();
    }
  }, [totalTime]);

  useEffect(() => {
    if (!running) return;

    if (gameInterval.current) clearInterval(gameInterval.current);

    if (!paused) {
      gameInterval.current = window.setInterval(() => {
        setTotalTime(t => t + 1);
      }, 1000);
    }

    return () => {
      if (gameInterval.current) clearInterval(gameInterval.current);
    };
  }, [running, paused]);

  useEffect(() => {
    const animate = () => {
      if (!paused && gameRef.current) {
        const tooth = document.getElementById('upper_tooth')?.getBoundingClientRect();

        // spawn bacteria more frequently
        if (spawnCounter.current++ % 90 === 0) {
          spawnBacteria();
        }

        bacteriaList.current.forEach((bacteria, index) => {
          bacteria.x += bacteria.vx;
          bacteria.y += bacteria.vy;
          bacteria.el.style.left = `${bacteria.x}px`;
          bacteria.el.style.top = `${bacteria.y}px`;

          const bRect = bacteria.el.getBoundingClientRect();

          for (let i = currentStack.current - 1; i >= 0; i--) {
            const s = document.getElementById(`shield${i + 1}`);
            if (s) {
              const sRect = s.getBoundingClientRect();
              if (isColliding(bRect, sRect)) {
                setScore(prev => prev + 100);
                setStack(prev => Math.max(0, prev - 1));
                gameRef.current?.removeChild(bacteria.el);
                bacteriaList.current.splice(index, 1);
                return;
              }
            }
          }

          if (stack <= 0 && tooth && isColliding(bRect, tooth)) {
            setScore(prev => prev - 100);
            gameRef.current?.removeChild(bacteria.el);
            bacteriaList.current.splice(index, 1);
            return;
          }
        });
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current!);
  }, [paused]);

  const spawnBacteria = () => {
    if (!gameRef.current) return;
    const gameW = gameRef.current.clientWidth;
    const gameH = gameRef.current.clientHeight;

    const el = document.createElement('img');
    const enemies = [`game/bacteria/${phase + 1}.png`];
    if (phase === 5) enemies.push('game/bacteria/boss6.png');
    el.src = enemies[Math.floor(Math.random() * enemies.length)];
    el.className = 'bacteria';
    gameRef.current.appendChild(el);

    let x = 0, y = 0;
    const side = Math.floor(Math.random() * 4);
    if (side === 0) { x = Math.random() * gameW; y = -50; }
    if (side === 1) { x = Math.random() * gameW; y = gameH + 50; }
    if (side === 2) { x = -50; y = Math.random() * gameH; }
    if (side === 3) { x = gameW + 50; y = Math.random() * gameH; }

    const targetX = gameW / 2 - 25;
    const targetY = gameH / 2 - 25;
    const dx = targetX - x;
    const dy = targetY - y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const speed = 0.5;
    const vx = (dx / dist) * speed;
    const vy = (dy / dist) * speed;

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    bacteriaList.current.push({ el, x, y, vx, vy });
  };

  const isColliding = (r1: DOMRect, r2: DOMRect): boolean => {
    return !(r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom);
  };

  const startGame = () => {
    if (running) return;
    setRunning(true);
    setPaused(false);
  };

  const togglePause = () => {
    setPaused(prev => !prev);
  };

  const restartGame = () => {
    setTotalTime(0);
    setBrushingTime(PHASE_DURATION);
    setScore(0);
    setStack(0);
    setPaused(false);
    setRunning(false);
    setEnd(false);
    bacteriaList.current.forEach(b => b.el.remove());
    bacteriaList.current = [];
  };

  const endGame = () => {
    if (gameInterval.current) clearInterval(gameInterval.current);
    cancelAnimationFrame(animationRef.current!);
    const stars = score >= 300 ? 3 : score >= 200 ? 2 : score >= 100 ? 1 : 0;
    setRating('⭐'.repeat(stars));
    setEnd(true);
  };

  return (
    <div>
      <div id="game" ref={gameRef}>
        <ShieldLayers stack={stack} />
        <ToothImage src={toothImage} />
        <HUD totalTime={totalTime} brushingTime={brushingTime} phase={phase} score={score} stack={stack} />
        {end && (
          <EndScreen
            score={score}
            totalTime={totalTime}
            rating={rating}
            onRestart={restartGame}
          />
        )}
      </div>
      <Controls
        paused={paused}
        stack={stack}
        onStart={startGame}
        onPauseToggle={togglePause}
        onStackChange={setStack}
      />
    </div>
  );
};

export default OldApp;