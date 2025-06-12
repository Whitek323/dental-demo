// GameComponents.tsx
import React from 'react';

export const ShieldLayers: React.FC<{ stack: number }> = ({ stack }) => {
  return (
    <>
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="shield-layer"
          id={`shield${i + 1}`}
          style={{ display: stack > i ? 'block' : 'none' }}
        ></div>
      ))}
    </>
  );
};

export const ToothImage: React.FC<{ src: string }> = ({ src }) => (
  <img
    id="upper_tooth"
    src={src}
    alt="tooth"
    style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
  />
);

export const HUD: React.FC<{
  totalTime: number;
  brushingTime: number;
  phase: number;
  score: number;
  stack: number;
}> = ({ totalTime, brushingTime, phase, score, stack }) => (
  <>
<div className="fixed-top top-0 d-flex justify-content-center align-items-center gap-3 mt-5" style={{ zIndex: 99 }}>
  <div id="hud" className="bg-info fs-3 text-dark rounded text-center ms-3 px-3 py-1" style={{ width: '250px' }}>
    {formatTime(totalTime)}
  </div>
  <div id="lowerhud" className="bg-warning fs-3 fw-bold fst-italic text-dark rounded text-center px-3 py-1 me-3"  style={{width:"250px"}}>
    {score}PT
  </div>
</div>
<div className="fixed-bottom d-flex flex-row w-mw-100 justify-content-center" style={{marginBottom:"100px"}}>

  <div className='text-center bg-dark rounded me-2 p-1 text-white' >
  แปรงฟันบนด้านขวา {phase + 1}/6
  </div>
  <div className='bg-secondary rounded p-1 text-white'>
   {formatTime(brushingTime)} 
  </div>
{/* Stack: {stack} */}
</div>
  </>
);

export const Controls: React.FC<{
  paused: boolean;
  stack: number;
  onStart: () => void;
  onPauseToggle: () => void;
  onStackChange: (v: number) => void;
}> = ({ paused, stack, onStart, onPauseToggle, onStackChange }) => (
  <div id="controls">
    <button className='btn btn-primary' onClick={onStart}>เริ่ม</button>
    <button className='btn btn-danger' onClick={onPauseToggle}>{paused ? 'Resume' : 'Pause'}</button>
    <input
      type="number"
      // className='form-control'
      min={0}
      max={3}
      value={stack}
      onChange={(e) => onStackChange(Math.max(0, Math.min(3, parseInt(e.target.value))))}
      style={{ width: '60px' }}
      aria-label="ตั้งค่าเกราะ"
    />
    
  </div>
);

export const EndScreen: React.FC<{
  score: number;
  totalTime: number;
  rating: string;
  onRestart: () => void;
}> = ({ score, totalTime, rating, onRestart }) => (
  <div id="endScreen" style={{ display: 'flex' }}>
    <div id="endText">
      🎉 Congratulations!<br />
      คะแนนรวม: {score}<br />
      เวลารวม: {formatTime(totalTime)}<br />
      Rating: {rating}
    </div>
    <button onClick={onRestart}>เล่นอีกครั้ง</button>
    <button onClick={() => window.close()}>ออกเกม</button>
  </div>
);

function formatTime(seconds: number): string {
  const min = Math.floor(seconds / 60).toString().padStart(2, '0');
  const sec = (seconds % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}
