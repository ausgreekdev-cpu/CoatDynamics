import { useEffect, useRef, useState } from 'react';

export default function BarcodeScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    let stream: MediaStream;
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(s => { stream = s; if (videoRef.current) { videoRef.current.srcObject = s; videoRef.current.play(); } })
      .catch(() => setError('Camera unavailable'));
    return () => stream?.getTracks().forEach(t => t.stop());
  }, []);
  const scan = async () => {
    const Detector = (window as any).BarcodeDetector;
    if (!Detector || !videoRef.current) { setError('BarcodeDetector not supported'); return; }
    const detector = new Detector({ formats: ['ean_13', 'code_128', 'qr_code'] });
    const codes = await detector.detect(videoRef.current);
    if (codes.length) setResult(codes[0].rawValue);
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Barcode Scanner</h1>
      <video ref={videoRef} className="w-full max-w-md border rounded" />
      <div className="mt-2 flex gap-2">
        <button onClick={scan} className="bg-blue-600 text-white px-4 py-2 rounded">Scan</button>
        {result && <p className="text-green-600">Scanned: {result}</p>}
      </div>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
