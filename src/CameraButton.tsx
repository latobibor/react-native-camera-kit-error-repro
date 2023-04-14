import {Camera, CameraScreen} from 'react-native-camera-kit';
import React, {useEffect, useRef, useState} from 'react';
import {Button, PermissionsAndroid, View} from 'react-native';

const lolImage = require('./lol.png');

console.log('lolimage', lolImage);

export function CameraButton() {
  const [isOpen, setIsOpen] = useState(false);

  async function requestCamPermission(): Promise<boolean> {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {buttonPositive: 'Yes', title: 'LOL', message: 'banan'},
    );

    return result === PermissionsAndroid.RESULTS.GRANTED;
  }

  async function requestWritePermission(): Promise<boolean> {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {buttonPositive: 'Yes', title: 'LOL', message: 'banan'},
    );

    return result === PermissionsAndroid.RESULTS.GRANTED;
  }

  async function requestReadPermission(): Promise<boolean> {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {buttonPositive: 'Yes', title: 'LOL', message: 'banan'},
    );

    return result === PermissionsAndroid.RESULTS.GRANTED;
  }

  useEffect(() => {
    async function lol() {
      await requestCamPermission();
      await requestWritePermission();
      await requestReadPermission();
    }

    lol();
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
  const cameraRef = useRef();

  function onBottomButtonPressed(event: any) {
    console.log('helloka', event);

    const images = JSON.stringify(event.captureImages);

    console.log('event type', event.type);
    console.log('images', images.substring(0, 10));
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
        captureButtonImage={lolImage}
        captureButtonImageStyle={{
          marginTop: 150,
          marginRight: 'auto',
          borderColor: 'red',
          borderWidth: 2,
        }}
        allowCaptureRetake={false}
        showCapturedImageCount={true}
      />
    </View>
  );
}
