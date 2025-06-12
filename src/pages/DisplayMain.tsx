import 'bootstrap/dist/css/bootstrap.min.css';
import HandDetector from '../components/HandDetector';
import FaceDetector from '../components/FaceDetector';

function DisplayMain() {
  return (
    <div className="container py-3">
      <h1 className="text-center mb-4">MediaPipe Detection</h1>
      {/* <HandDetector /> */}
      <FaceDetector/>
    </div>
  );
}

export default DisplayMain;
