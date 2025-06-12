import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    Hands: any;
    Camera: any;
    ControlPanel: any;
    StaticText: any;
    Toggle: any;
    Slider: any;
    drawConnectors: any;
    drawLandmarks: any;
    HAND_CONNECTIONS: any;
    FPS: any;
  }
}

export default function HandDetector() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const controlRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadMediaPipeScripts = async () => {
      const scripts = [
        'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.1/camera_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/control_utils@0.1/control_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.2/drawing_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.1/hands.js',
      ];
      for (const src of scripts) {
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = src;
          script.async = true;
          script.crossOrigin = 'anonymous';
          script.onload = resolve;
          document.body.appendChild(script);
        });
      }

      initHands();
    };

    const initHands = () => {
      const video = videoRef.current!;
      const canvas = canvasRef.current!;
      const controlsElement = controlRef.current!;
      const canvasCtx = canvas.getContext('2d')!;
      const fpsControl = new window.FPS();

      const spinner = document.querySelector('.loading') as HTMLElement;
      if (spinner) {
        spinner.ontransitionend = () => {
          spinner.style.display = 'none';
        };
      }

      const onResultsHands = (results: any) => {
        document.body.classList.add('loaded');
        fpsControl.tick();
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        canvasCtx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
        if (results.multiHandLandmarks && results.multiHandedness) {
          for (let index = 0; index < results.multiHandLandmarks.length; index++) {
            const classification = results.multiHandedness[index];
            const isRightHand = classification.label === 'Right';
            const landmarks = results.multiHandLandmarks[index];
            window.drawConnectors(canvasCtx, landmarks, window.HAND_CONNECTIONS, {
              color: isRightHand ? '#00FF00' : '#FF0000',
            });
            window.drawLandmarks(canvasCtx, landmarks, {
              color: isRightHand ? '#00FF00' : '#FF0000',
              fillColor: isRightHand ? '#FF0000' : '#00FF00',
              radius: (x: any) => 10 - 9 * ((x.from.z + 0.15) / 0.25),
            });
          }
        }
        canvasCtx.restore();
      };

      const hands = new window.Hands({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.1/${file}`,
      });
      hands.onResults(onResultsHands);

      const camera = new window.Camera(video, {
        onFrame: async () => {
          await hands.send({ image: video });
        },
        width: 480,
        height: 480,
      });
      camera.start();

      new window.ControlPanel(controlsElement, {
        selfieMode: true,
        maxNumHands: 2,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      })
        .add([
          new window.StaticText({ title: 'MediaPipe Hands' }),
          fpsControl,
          new window.Toggle({ title: 'Selfie Mode', field: 'selfieMode' }),
          new window.Slider({
            title: 'Max Number of Hands',
            field: 'maxNumHands',
            range: [1, 4],
            step: 1,
          }),
          new window.Slider({
            title: 'Min Detection Confidence',
            field: 'minDetectionConfidence',
            range: [0, 1],
            step: 0.01,
          }),
          new window.Slider({
            title: 'Min Tracking Confidence',
            field: 'minTrackingConfidence',
            range: [0, 1],
            step: 0.01,
          }),
        ])
        .on((options: any) => {
          video.classList.toggle('selfie', options.selfieMode);
          hands.setOptions(options);
        });
    };

    loadMediaPipeScripts();
  }, []);

  return (
    <div className="detector-container">
      <video ref={videoRef} className="input_video3" style={{ display: 'none' }} />
      <canvas ref={canvasRef} className="output3" width={375} height={480}></canvas>
      <div ref={controlRef} className="control3" style={{ visibility: 'hidden' }}></div>
      <div className="loading">
        <div className="spinner"></div>
      </div>
    </div>
  );
}
