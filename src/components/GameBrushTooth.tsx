import { useEffect, useRef, useState } from 'react';
import './GameBrushTooth.css';
import DetectWithAI from './DetectWithAI';

declare global {
  interface Window {
    FaceMesh: any;
    Camera: any;
    ControlPanel: any;
    StaticText: any;
    Toggle: any;
    Slider: any;
    drawConnectors: any;
    FACEMESH_TESSELATION: any;
    FACEMESH_RIGHT_EYE: any;
    FACEMESH_RIGHT_EYEBROW: any;
    FACEMESH_LEFT_EYE: any;
    FACEMESH_LEFT_EYEBROW: any;
    FACEMESH_FACE_OVAL: any;
    FACEMESH_LIPS: any;
    FPS: any;
  }
}

export default function GameBrushTooth() {
  const [showCircle, setShowCircle] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const controlRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadScripts = async () => {
      const srcs = [
        'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.1/camera_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/control_utils@0.1/control_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.1/drawing_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.1/face_mesh.js',
      ];
      for (const src of srcs) {
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

    const initFaceMesh = () => {
      const video = videoRef.current!;
      const canvas = canvasRef.current!;
      const controls = controlRef.current!;
      const ctx = canvas.getContext('2d')!;
      const fpsControl = new window.FPS();
      video.onloadedmetadata = () => {
        setIsVideoReady(true); // กล้องโหลดพร้อมแล้ว
      };


      const onResults = (results: any) => {
        document.body.classList.add('loaded');
        fpsControl.tick();
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
        if (results.multiFaceLandmarks) {
          for (const landmarks of results.multiFaceLandmarks) {
            const nose = landmarks[1]; // กลางหน้า
            if (showCircle && circleRef.current) {
              const x = nose.x * canvas.width;
              const y = nose.y * canvas.height;
              const circleSize = 350;
              circleRef.current.style.left = `${x - circleSize / 2}px`;
              circleRef.current.style.top = `${y - circleSize / 2}px`;
              circleRef.current.style.display = 'block';
            } else if (circleRef.current) {
              circleRef.current.style.display = 'none';
            }

            window.drawConnectors(ctx, landmarks, window.FACEMESH_TESSELATION, { color: '#C0C0C070', lineWidth: 1 });
            window.drawConnectors(ctx, landmarks, window.FACEMESH_RIGHT_EYE, { color: '#FF3030' });
            window.drawConnectors(ctx, landmarks, window.FACEMESH_RIGHT_EYEBROW, { color: '#FF3030' });
            window.drawConnectors(ctx, landmarks, window.FACEMESH_LEFT_EYE, { color: '#30FF30' });
            window.drawConnectors(ctx, landmarks, window.FACEMESH_LEFT_EYEBROW, { color: '#30FF30' });
            window.drawConnectors(ctx, landmarks, window.FACEMESH_FACE_OVAL, { color: '#E0E0E0' });
            window.drawConnectors(ctx, landmarks, window.FACEMESH_LIPS, { color: '#E0E0E0' });
          }
        }
        ctx.restore();
      };

      const faceMesh = new window.FaceMesh({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.1/${file}`,
      });
      faceMesh.onResults(onResults);

      const camera = new window.Camera(video, {
        onFrame: async () => {
          await faceMesh.send({ image: video });
        },
        width: 480,
        height: 480,
      });
      camera.start();

      new window.ControlPanel(controls, {
        selfieMode: true,
        maxNumFaces: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      })
        .add([
          new window.StaticText({ title: 'Game: Brush Tooth with FaceMesh' }),
          fpsControl,
          new window.Toggle({ title: 'Selfie Mode', field: 'selfieMode' }),
          new window.Slider({ title: 'Max Number of Faces', field: 'maxNumFaces', range: [1, 4], step: 1 }),
          new window.Slider({ title: 'Min Detection Confidence', field: 'minDetectionConfidence', range: [0, 1], step: 0.01 }),
          new window.Slider({ title: 'Min Tracking Confidence', field: 'minTrackingConfidence', range: [0, 1], step: 0.01 }),
        ])
        .on((opts: any) => {
          video.classList.toggle('selfie', opts.selfieMode);
          faceMesh.setOptions(opts);
        });
    };

    const inputHandler = () => {
      const val = inputRef.current?.value.trim();
      setShowCircle(val === '1');
    };

    inputRef.current?.addEventListener('input', inputHandler);
    loadScripts();

    return () => {
      inputRef.current?.removeEventListener('input', inputHandler);
    };
  }, [showCircle]);

  return (
    <div className="container position-relative mt-4">
      <div className="text-center mb-3">
        {/* <h4>🪥 พิมพ์ 0 หรือ 1 เพื่อควบคุมวงกลม</h4>
        <input
          ref={inputRef}
          type="text"
          className="form-control w-50 mx-auto"
          placeholder="0 = ปิด, 1 = แสดง"
        /> */}
      </div>

    <div className="position-relative text-center overflow-hidden" style={{ maxWidth: 480, margin: '0 auto' }}>
      <video ref={videoRef} className="d-none" autoPlay muted playsInline />
      <canvas ref={canvasRef} className="w-100" width={480} height={480} />
      <div ref={circleRef} className="shield-layer" />
{videoRef.current && videoRef.current && (
 <DetectWithAI
  videoElement={videoRef.current} 
  onTrigger={(state) => {
    // console.log('🔔 TRIGGER:', state); 
    setShowCircle(state);
  }} 
/>

)}


    </div>


      <div className="loading text-center my-2">

        {/* <div className="spinner-border" role="status" /> */}
      </div>
      <div ref={controlRef} style={{ visibility: 'hidden' }} />
    </div> 
  );
}
