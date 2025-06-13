import { useEffect, useRef } from 'react';

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

export default function FaceDetector() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const controlRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadScripts = async () => {
      const srcs = [
        'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.1/camera_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/control_utils@0.1/control_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.1/drawing_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/face_mesh.js',
      ];
      for (const src of srcs) {
        await new Promise<void>((res) => {
          const s = document.createElement('script');
          s.src = src; s.async = true;
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
      const controlsPlaceholder = controlRef.current!;
      const ctx = canvas.getContext('2d')!;
      const fpsControl = new window.FPS();

      const spinner = document.querySelector('.loading') as HTMLElement;
      spinner.ontransitionend = () => spinner.style.display = 'none';

      const onResults = (results: any) => {
        document.body.classList.add('loaded');
        fpsControl.tick();
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
        if (results.multiFaceLandmarks) {
          for (const landmarks of results.multiFaceLandmarks) {
            const { drawConnectors, FACEMESH_TESSELATION, FACEMESH_RIGHT_EYE,
                    FACEMESH_RIGHT_EYEBROW, FACEMESH_LEFT_EYE,
                    FACEMESH_LEFT_EYEBROW, FACEMESH_FACE_OVAL,
                    FACEMESH_LIPS } = window;
            drawConnectors(ctx, landmarks, FACEMESH_TESSELATION, { color: '#C0C0C070', lineWidth: 1 });
            drawConnectors(ctx, landmarks, FACEMESH_RIGHT_EYE, { color: '#FF3030' });
            drawConnectors(ctx, landmarks, FACEMESH_RIGHT_EYEBROW, { color: '#FF3030' });
            drawConnectors(ctx, landmarks, FACEMESH_LEFT_EYE, { color: '#30FF30' });
            drawConnectors(ctx, landmarks, FACEMESH_LEFT_EYEBROW, { color: '#30FF30' });
            drawConnectors(ctx, landmarks, FACEMESH_FACE_OVAL, { color: '#E0E0E0' });
            drawConnectors(ctx, landmarks, FACEMESH_LIPS, { color: '#E0E0E0' });
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

      new window.ControlPanel(controlsPlaceholder, {
        selfieMode: true,
        maxNumFaces: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      })
        .add([
          new window.StaticText({ title: 'MediaPipe Face Mesh' }),
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

    loadScripts();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 col-md-6 mb-3 d-none">
          <div className="card">
            <div className="card-header bg-info text-white">Webcam Input</div>
            <div className="card-body p-2">
              <video ref={videoRef} className="input_video2 w-100" autoPlay muted playsInline />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <div className="card">
            <div className="card-header bg-info text-white">MediaPipe Face Mesh</div>
            <div className="card-body p-2">
              <canvas ref={canvasRef} className="output2 w-100" width={480} height={480} />
            </div>
          </div>
        </div>
      </div>
      <div className="loading text-center my-2">
        <div className="spinner-border" role="status" />
      </div>
      <div ref={controlRef} style={{ visibility: 'hidden' }} />
    </div>
  );
}
