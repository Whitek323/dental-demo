// GameComponents.tsx
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
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

export const HUD: React.FC<{
  totalTime: number;
  brushingTime: number;
  phase: number;
  score: number;
  stack: number;
}> = ({ totalTime, brushingTime, phase, score, stack }) => (
  <>
    <nav className="navbar fixed-top text-white my-0 py-2" style={{ backgroundColor: "#2f064f" }}>
      <div className="container-fluid d-flex align-content-between justify-content-between">
        <div className="d-flex align-items-center">
          <div className="me-1 px-2 fs-3 rounded-3" style={{background:"#4c00c7"}}>
          <MenuIcon />
          </div>
          <div id="hud" className='rounded-3 fs-3 text-dark px-4 align-items-center me-1' style={{ backgroundColor: "#00bdda" }}>
            {formatTime(totalTime)}
          </div>
        </div>
        <div id="lowerhud" className='rounded-3 text-dark fst-italic px-4 fs-3 fw-bold px-1 d-flex align-items-center' style={{ backgroundColor: "#e1dd04" }}>
          {score}PT
        </div>
      </div>
    </nav>
    <div className="fixed-bottom d-flex flex-row w-mw-100 justify-content-center" style={{ marginBottom: "100px" }}>

      {/* Stack: {stack} */}
    </div>
  </>
);

export const Controls: React.FC<{
  running: boolean;
  paused: boolean;
  stack: number;
  onStart: () => void;
  brushingTime: number;
  onPauseToggle: () => void;
  onStackChange: (v: number) => void;
}> = ({ running, paused, stack, onStart, brushingTime, onPauseToggle, onStackChange }) => (
  <div className="fixed-bottom py-2 bg-dark bottom-0 d-flex justify-content-center align-items-center gap-3 mt-5" style={{ zIndex: 9 }}>

    {!running && (
      <button className="btn btn-primary px-4 text-center z-3" onClick={onStart}>
        เริ่ม
      </button>
    )}
    <div className='btn btn-secondary rounded px-4 text-white'>
      {formatTime(brushingTime)}
    </div>
    {running && (
      <button className="btn btn-danger px-4 text-center" onClick={onPauseToggle}>
        {paused ? 'Resume' : 'Pause'}
      </button>
    )}
    {/* <input
  type="number"
  // className='form-control'
  min={0}
  max={3}
  value={stack}
  onChange={(e) => onStackChange(Math.max(0, Math.min(3, parseInt(e.target.value))))}
  style={{ width: '60px' }}
  aria-label="ตั้งค่าเกราะ"
/> */}
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
