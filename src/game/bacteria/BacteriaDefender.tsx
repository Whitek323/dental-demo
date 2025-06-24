import React, { useEffect, useRef, useState } from 'react';
import user_example from '../../constant';
import './App.css';
import {
  ShieldLayers,
  HUD,
  Controls,
  EndScreen,
  ToothImage
} from './GameComponents';
import DetectWithAI from './DetectWithAI';
import Navbar from '../../layout/Navbar';

const MAX_TIME = 120;
const PHASE_DURATION = 20;
const TOTAL_PHASES = 6;

declare global {
  interface Window {
    FaceMesh: any;
    Camera: any;
    drawConnectors: any;
    FACEMESH_FACE_OVAL: any;
  }
}

interface Bacteria {
  el: HTMLImageElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const BacteriaDefender: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shieldRef = useRef<HTMLDivElement>(null);
  const faceRef = useRef<HTMLDivElement>(null); 

  const [totalTime, setTotalTime] = useState(0);
  const [brushingTime, setBrushingTime] = useState(PHASE_DURATION);
  const [score, setScore] = useState(0);
  const [stack, setStack] = useState(0);
  const [paused, setPaused] = useState(false);
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState(0);
  const [end, setEnd] = useState(false);
  const [rating, setRating] = useState('');
  const [showShield, setShowShield] = useState(false);
  const [toothSrc, setToothSrc] = useState('');


  const gameInterval = useRef<number | null>(null);
  const animationRef = useRef<number>();
  const bacteriaList = useRef<Bacteria[]>([]);
  const currentStack = useRef<number>(0);
  const spawnCounter = useRef<number>(0);
  useEffect(() => {
  const phaseImage = `${phase + 1}.png`;
  const altImage = phase < 3 ? 'upper-normal.png' : 'lower-normal.png';
  let showMain = true;

  const interval = setInterval(() => {
    setToothSrc(showMain ? `game/tooth/${phaseImage}` : `game/tooth/${altImage}`);
    showMain = !showMain;
  }, 1000);

  return () => clearInterval(interval);
}, [phase]);

  useEffect(() => {
    currentStack.current = stack;
  }, [stack]);
    useEffect(() => {
    if (running && !paused) {
      if (gameInterval.current) clearInterval(gameInterval.current);
      gameInterval.current = window.setInterval(() => {
        setTotalTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (gameInterval.current) clearInterval(gameInterval.current);
    };
  }, [running, paused]);

  useEffect(() => {
    const currentPhase = Math.min(Math.floor(totalTime / PHASE_DURATION), TOTAL_PHASES - 1);
    setPhase(currentPhase);
    setBrushingTime(PHASE_DURATION - (totalTime % PHASE_DURATION));
    if (totalTime >= MAX_TIME) endGame();
  }, [totalTime]);

  useEffect(() => {
    const animate = () => {
      if (!paused && gameRef.current) {
        const shieldRect = shieldRef.current?.getBoundingClientRect();
        const faceRect = faceRef.current?.getBoundingClientRect();

        if (spawnCounter.current++ % 90 === 0 && totalTime>0) spawnBacteria();

        bacteriaList.current.forEach((bacteria, index) => {
          bacteria.x += bacteria.vx;
          bacteria.y += bacteria.vy;
          bacteria.el.style.left = `${bacteria.x}px`;
          bacteria.el.style.top = `${bacteria.y}px`;
          const bRect = bacteria.el.getBoundingClientRect();

          if (showShield && shieldRect && isColliding(bRect, shieldRect)) {
            setScore(prev => prev + 100);
            gameRef.current?.removeChild(bacteria.el);
            bacteriaList.current.splice(index, 1);
            return;
          }
          if (!showShield && faceRect && isColliding(bRect, faceRect)) {
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
  }, [paused, showShield, running, totalTime]);

  useEffect(() => {
    const load = async () => {
      const scripts = [
        'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.1/camera_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.1/drawing_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.1/face_mesh.js',
      ];
      for (const src of scripts) {
        await new Promise<void>((res) => {
          const s = document.createElement('script');
          s.src = src;
          s.async = true;
          s.crossOrigin = 'anonymous';
          s.onload = () => res();
          document.body.appendChild(s);
        });
      }
      initFaceMesh();
    };
    load();
  }, []);

  const initFaceMesh = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const video = videoRef.current!;

    const faceMesh = new window.FaceMesh({
      locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.1/${file}`,
    });
    faceMesh.setOptions({ selfieMode: true, maxNumFaces: 1, minDetectionConfidence: 0.5, minTrackingConfidence: 0.5 });

    faceMesh.onResults((results: any) => {
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
      if (results.multiFaceLandmarks) {
        for (const landmarks of results.multiFaceLandmarks) {
          const nose = landmarks[1];
          const canvasEl = canvasRef.current!;
          const canvasRect = canvasEl.getBoundingClientRect();

          const x = nose.x * canvasRect.width + canvasRect.left;
          const y = nose.y * canvasRect.height + canvasRect.top;

          // const canvasOffset = canvasEl.getBoundingClientRect();

          // const x = nose.x * canvasEl.width + (canvasOffset.left - gameRect.left);
          // const y = nose.y * canvasEl.height + (canvasOffset.top - gameRect.top);

          const left = landmarks[234];
          const right = landmarks[454]; 

          const faceWidthPx = Math.abs(right.x - left.x) * canvas.width;
          const size = faceWidthPx * 3; 
          // const size = 300;
          if (shieldRef.current) {
            shieldRef.current.style.left = `${x - size / 2}px`;
            shieldRef.current.style.top = `${y - size / 2}px`;
            shieldRef.current.style.width = `${size}px`;
            shieldRef.current.style.height = `${size}px`;
          }
          if (faceRef.current) {
            faceRef.current.style.left = `${x - size / 2}px`;
            faceRef.current.style.top = `${y - size / 2}px`;
            faceRef.current.style.width = `${size}px`;
            faceRef.current.style.height = `${size}px`;
          }
        }
      }
      ctx.restore();
    });

    const camera = new window.Camera(video, {
      onFrame: async () => await faceMesh.send({ image: video }),
      width: 480,
      height: 480,
    });
    camera.start();
  };

  const spawnBacteria = () => {
    if (!gameRef.current) return;
    
    const gameW = gameRef.current.clientWidth;
    const gameH = gameRef.current.clientHeight;
    const canvas = canvasRef.current!;
    const canvasRect = canvas.getBoundingClientRect();
    const targetX = canvasRect.left + canvasRect.width / 2;
    const targetY = canvasRect.top + canvasRect.height / 2;

    const el = document.createElement('img');
    el.onload = () => gameRef.current!.appendChild(el); // ปลอดภัยกว่า

    const enemies = [`theme/${user_example.theme}/enemy/${phase + 1}.png`];
    // if (phase === 5) enemies.push('game/bacteria/boss6.png');
    el.src = enemies[Math.floor(Math.random() * enemies.length)];
    el.className = 'bacteria';
    gameRef.current.appendChild(el);

    let x = 0, y = 0;
    const side = Math.floor(Math.random() * 4);
    if (side === 0) { x = Math.random() * gameW; y = -50; }
    if (side === 1) { x = Math.random() * gameW; y = gameH + 50; }
    if (side === 2) { x = -50; y = Math.random() * gameH; }
    if (side === 3) { x = gameW + 50; y = Math.random() * gameH; }

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

  const isColliding = (r1: DOMRect, r2: DOMRect) => {
    return !(r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom);
  };

  const startGame = () => { 
    if (running) return;
    setRunning(true); 
    setPaused(false); 
  };
  const togglePause = () => setPaused(p => !p);
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
      <Navbar/>
      <div id="game" ref={gameRef} className="d-flex flex-column justify-content-center vh-100 align-items-center position-relative" style={{ position: 'relative'}}>
        <video ref={videoRef} className="position-absolute d-none" autoPlay muted playsInline />
        <canvas ref={canvasRef} className="m-auto rounded-4" style={{ zIndex: 1,width:"80vh",height:"90vh"}} />
        <div ref={shieldRef} className="shield-layer position-absolute rounded-circle" style={{ display: showShield ? 'block' : 'none', zIndex: 2 }} />
        <div ref={faceRef} className="position-absolute" style={{ width: 1, height: 1, zIndex: 0 }} />
        <DetectWithAI videoElement={videoRef.current} onTrigger={setShowShield} />
        
        <div
          className="position-fixed"
          style={{ bottom: '6rem', right: '2.8rem', zIndex: 10 }}
        >
          <img style={{background:"#162283",zIndex:10}}
            id="tooth"
            src={toothSrc}
            alt="tooth"
            className='rounded-5'
            
            />
        </div>
        <HUD totalTime={totalTime} brushingTime={brushingTime} phase={phase} score={score} stack={stack} />
        {end && <EndScreen score={score} totalTime={totalTime} rating={rating} onRestart={restartGame} />}
        <Controls
          running={running}
          paused={paused}
          stack={stack}
          onStart={startGame}
          brushingTime={brushingTime}
          onPauseToggle={togglePause}
          onStackChange={setStack}
        />

      </div>
    </div>
  );
};

export default BacteriaDefender;
