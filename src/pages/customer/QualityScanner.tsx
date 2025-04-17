
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Camera, Upload, RefreshCw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const QualityScanner = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<null | {
    quality: 'high' | 'medium' | 'low';
    freshness: number;
    details: {
      nutrition: string;
      pesticides: string;
      storage: string;
    }
  }>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraActive, setCameraActive] = useState(false);

  // Function to start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Unable to access camera. Please ensure you have granted camera permissions.");
    }
  };

  // Function to stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  // Function to capture image from camera
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageDataUrl = canvas.toDataURL('image/png');
      setCapturedImage(imageDataUrl);
      stopCamera();
    }
  };

  // Function to handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Function to analyze the image
  const analyzeImage = () => {
    if (!capturedImage) return;
    
    setScanning(true);
    
    // Simulate analysis with setTimeout
    setTimeout(() => {
      // Mock result - in a real app, this would come from an AI/ML service
      const mockResults = {
        quality: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low',
        freshness: Math.floor(Math.random() * 40) + 60, // 60-100%
        details: {
          nutrition: "Good source of Vitamin C and antioxidants.",
          pesticides: "No harmful pesticide residues detected.",
          storage: "Store at room temperature. Should stay fresh for 4-5 days."
        }
      };
      
      setScanResult(mockResults);
      setScanning(false);
    }, 2000);
  };

  // Function to reset the scanner
  const resetScanner = () => {
    setCapturedImage(null);
    setScanResult(null);
    setCameraActive(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-farmandi-brown text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center">
            <Link to="/customer/dashboard" className="mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Quality Scanner</h1>
              <p className="text-white/80">Verify the freshness and quality of produce</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Card className="max-w-2xl mx-auto overflow-hidden">
          {/* Instructions */}
          {!capturedImage && !cameraActive && (
            <div className="p-8 text-center">
              <div className="bg-farmandi-brown/10 rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center mb-6">
                <Camera className="h-12 w-12 text-farmandi-brown" />
              </div>
              <h2 className="text-xl font-semibold mb-4">Produce Quality Scanner</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Take a clear photo of fruits or vegetables to analyze their freshness, 
                quality, and nutritional information.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="customer" onClick={startCamera} className="flex gap-2">
                  <Camera className="h-4 w-4" /> Take Photo
                </Button>
                <Button variant="outline" onClick={triggerFileInput} className="flex gap-2">
                  <Upload className="h-4 w-4" /> Upload Image
                </Button>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileUpload} 
                  accept="image/*" 
                  className="hidden"
                />
              </div>
            </div>
          )}

          {/* Camera View */}
          {cameraActive && (
            <div className="p-6">
              <div className="relative">
                <video 
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full rounded-lg"
                />
                <div className="absolute inset-0 border-2 border-dashed border-farmandi-brown/50 rounded-lg pointer-events-none"></div>
              </div>
              <div className="mt-6 flex justify-center">
                <Button variant="customer" onClick={captureImage} className="flex gap-2">
                  <Camera className="h-4 w-4" /> Capture
                </Button>
              </div>
              <canvas ref={canvasRef} className="hidden" />
            </div>
          )}

          {/* Captured Image & Analysis */}
          {capturedImage && !scanResult && !scanning && (
            <div className="p-6">
              <div className="mb-6">
                <img 
                  src={capturedImage} 
                  alt="Captured produce" 
                  className="w-full h-auto rounded-lg" 
                />
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={resetScanner}>
                  Try Again
                </Button>
                <Button variant="customer" onClick={analyzeImage}>
                  Analyze Image
                </Button>
              </div>
            </div>
          )}

          {/* Scanning State */}
          {scanning && (
            <div className="p-8 text-center">
              <div className="mb-6">
                <img 
                  src={capturedImage!} 
                  alt="Scanning produce" 
                  className="w-full h-auto rounded-lg opacity-70" 
                />
                <div className="mt-4 flex justify-center">
                  <RefreshCw className="h-10 w-10 text-farmandi-brown animate-spin" />
                </div>
              </div>
              <h3 className="text-lg font-medium mb-2">Analyzing Image</h3>
              <p className="text-gray-600">
                Please wait while we analyze the freshness and quality...
              </p>
            </div>
          )}

          {/* Results */}
          {scanResult && (
            <div className="divide-y">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <img 
                      src={capturedImage!} 
                      alt="Analyzed produce" 
                      className="w-full h-auto rounded-lg" 
                    />
                  </div>
                  
                  <div className="md:w-1/2">
                    <h3 className="text-xl font-semibold mb-4">Scan Results</h3>
                    
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600">Overall Quality:</span>
                        <div className="flex items-center">
                          {scanResult.quality === 'high' && (
                            <span className="flex items-center text-green-600">
                              <CheckCircle className="h-5 w-5 mr-1" /> Excellent
                            </span>
                          )}
                          {scanResult.quality === 'medium' && (
                            <span className="flex items-center text-amber-600">
                              <AlertCircle className="h-5 w-5 mr-1" /> Average
                            </span>
                          )}
                          {scanResult.quality === 'low' && (
                            <span className="flex items-center text-red-600">
                              <XCircle className="h-5 w-5 mr-1" /> Poor
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Freshness:</span>
                          <span className="font-medium">{scanResult.freshness}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              scanResult.freshness > 80 ? 'bg-green-500' : 
                              scanResult.freshness > 60 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${scanResult.freshness}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-1">Nutrition:</h4>
                        <p className="text-sm text-gray-600">{scanResult.details.nutrition}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-1">Pesticides:</h4>
                        <p className="text-sm text-gray-600">{scanResult.details.pesticides}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-1">Storage Recommendation:</h4>
                        <p className="text-sm text-gray-600">{scanResult.details.storage}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex justify-between">
                <Button variant="outline" onClick={resetScanner}>
                  Scan Another
                </Button>
                <Button variant="customer">
                  Find Similar Products
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Tips Section */}
        {!cameraActive && (
          <div className="max-w-2xl mx-auto mt-8">
            <h3 className="text-lg font-semibold mb-4">Tips for Better Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <h4 className="font-medium mb-2">Good Lighting</h4>
                <p className="text-sm text-gray-600">
                  Take photos in well-lit areas for more accurate analysis.
                </p>
              </Card>
              <Card className="p-4">
                <h4 className="font-medium mb-2">Close-up View</h4>
                <p className="text-sm text-gray-600">
                  Get close to the produce to capture detailed texture and color.
                </p>
              </Card>
              <Card className="p-4">
                <h4 className="font-medium mb-2">Multiple Items</h4>
                <p className="text-sm text-gray-600">
                  Scan one produce type at a time for best results.
                </p>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default QualityScanner;
