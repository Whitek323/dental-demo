import { useEffect, useRef, useState } from 'react';

const MODEL_URL = './my_model/';

declare global {
    interface Window {
        tmImage: any;
    }
}

interface Props {
    videoElement: HTMLVideoElement | null;
    onTrigger?: (state: boolean) => void;
}
interface Props {
    videoElement: HTMLVideoElement | null;
    onTrigger?: (state: boolean) => void;
}

export default function DetectWithAI({ videoElement, onTrigger }: Props) {
    const [topLabel, setTopLabel] = useState<string>('');

    useEffect(() => {
        const loadScripts = async () => {
            if (!window.tmImage) {
                const tf = document.createElement('script');
                tf.src = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js';
                tf.onload = () => {
                    if (!window.tmImage) {
                        const tm = document.createElement('script');
                        tm.src = 'https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js';
                        tm.onload = init;
                        document.body.appendChild(tm);
                    } else {
                        init();
                    }
                };
                document.body.appendChild(tf);
            } else {
                init();
            }
        };


        const init = async () => {
            if (!videoElement) return;

            const modelURL = MODEL_URL + 'model.json';
            const metadataURL = MODEL_URL + 'metadata.json';
            const model = await window.tmImage.load(modelURL, metadataURL);

            let isActive = true;

            const predictLoop = async () => {
                if (!videoElement || !isActive) return;
                const prediction = await model.predict(videoElement);

                const indexed = prediction.map((p, i) => ({ ...p, index: i }));
                const top = indexed.sort((a, b) => b.probability - a.probability)[0];

                setTopLabel(`${top.className}: ${top.probability.toFixed(2)}`);

                if (onTrigger) {
                    onTrigger(top.index === 1);
                }

                requestAnimationFrame(predictLoop);
            };

            // useEffect(() => {
            //     return () => {
            //         isActive = false;
            //     };
            // }, []);


            predictLoop();
        };

        loadScripts();
    }, [videoElement]);

    return (
        <div className="text-center mt-2 text-primary fw-bold z-3">
            {topLabel}
        </div>
    );
} 
