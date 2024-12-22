This solution uses useEffect and useRef to ensure the camera is ready before accessing its preview.  The camera ref provides a way to access the underlying camera object, and we use this to check if it's initialized before using it to take a picture. 

```javascript
import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';

const App = () => {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (!cameraRef.current || !isCameraReady) {
      console.log('Camera not ready');
      return;
    }
    try {
      let photo = await cameraRef.current.takePictureAsync();
      console.log('Photo taken:', photo);
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  };

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  if (hasPermission === null) {
    return <View><Text>Requesting permissions...</Text></View>;
  }
  if (hasPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={cameraRef}
        onCameraReady={handleCameraReady}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 20,
              left: 20,
            }}
            onPress={() => {
              setType(
                type === CameraType.back ? CameraType.front : CameraType.back
              );
            }}
          >
            <Text style={{ fontSize: 18, color: 'white' }}>Flip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 20,
              right: 20,
            }}
            onPress={takePicture}
          >
            <Text style={{ fontSize: 18, color: 'white' }}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};
export default App; 
```