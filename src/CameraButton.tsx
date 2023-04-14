import { CameraScreen } from 'react-native-camera-kit';
import React, { useEffect, useState } from 'react';
import { Button, PermissionsAndroid, View } from 'react-native';

const justACircle = require('./circle.png');

export function CameraButton() {
  const [isOpen, setIsOpen] = useState(false);

  async function requestCamPermission(): Promise<boolean> {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      { buttonPositive: 'Yes', title: 'LOL', message: 'banan' },
    );

    return result === PermissionsAndroid.RESULTS.GRANTED;
  }

  async function requestWritePermission(): Promise<boolean> {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      { buttonPositive: 'Yes', title: 'LOL', message: 'banan' },
    );

    return result === PermissionsAndroid.RESULTS.GRANTED;
  }

  async function requestReadPermission(): Promise<boolean> {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      { buttonPositive: 'Yes', title: 'LOL', message: 'banan' },
    );

    return result === PermissionsAndroid.RESULTS.GRANTED;
  }

  useEffect(() => {
    async function requestPermissions() {
      await requestCamPermission();
      await requestWritePermission();
      await requestReadPermission();
    }

    requestPermissions().catch(console.error);
  }, []);

  return (
    <>
      {!isOpen && (
        <View>
          <Button title="Open camera" onPress={() => setIsOpen(!isOpen)} />
        </View>
      )}
      {isOpen && <OpenableCameraScreen />}
    </>
  );
}

function OpenableCameraScreen() {
  function onBottomButtonPressed(event: any) {
    console.log('event that never arrives', event);
  }

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}>
      {/* @ts-ignore */}
      <CameraScreen
        onBottomButtonPressed={onBottomButtonPressed}
        scanBarcode={false}
        allowCaptureRetake={false}
        showCapturedImageCount={true}

        captureButtonImageStyle={{
          marginTop: 150,
          marginRight: 'auto',
          borderColor: 'red',
          borderWidth: 2,
        }}
        captureButtonImage={justACircle}
        cameraFlipImage={justACircle}
        torchOnImage={justACircle}
        torchOffImage={justACircle}
      />
    </View>
  );
}
