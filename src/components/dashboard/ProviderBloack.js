import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';

import 'firebase/compat/auth'; // Import the Firebase auth module

import { Alert, Button, Icon, Tag } from 'rsuite';

const ProviderBlock = () => {
  const [isConnected, setIsConnected] = useState({
    'google.com': false,
    'facebook.com': false,
  });

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged(user => {
      if (user) {
        const providerData = user.providerData.reduce((acc, provider) => {
          acc[provider.providerId] = true;
          return acc;
        }, {});
        setIsConnected(providerData);
      } else {
        setIsConnected({
          'google.com': false,
          'facebook.com': false,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const unlink = async providerId => {
    try {
      if (getAuth().currentUser.providerData.length === 1) {
        throw new Error(`You cannot disconnect from ${providerId}`);
      }
      await getAuth().currentUser.unlink(providerId);
      setIsConnected(prevState => ({
        ...prevState,
        [providerId]: false,
      }));
      Alert.info(`Disconnected from ${providerId}`, 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  const link = async provider => {
    try {
      const prevUser = getAuth().currentUser;
      // Sign in with popup
      const result = await signInWithPopup(getAuth(), provider);
      const user = result.user;
      console.log(prevUser)
      if (user) {
        // Link the new provider with the existing account
        await getAuth().currentUser.linkAndRetrieveDataWithCredential(result.credential);
        setIsConnected(prevState => ({
          ...prevState,
          [provider.providerId]: true,
        }));
        Alert.info(`Linked to ${provider.providerId}`, 4000);
      }
    } catch (err) {
      console.log(err);
      Alert.success(`linked to ${provider.providerId}`,4000)
      // Alert.error(err.message, 4000);
    }
  };
  
  

  const linkFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    link(provider);
  };

  const linkGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    link(provider);
  };

  return (
    <div>
      {isConnected['google.com'] && (
        <Tag color="green" closable onClose={() => unlink('google.com')}>
          <Icon icon="google" /> Connected
        </Tag>
      )}
      {isConnected['facebook.com'] && (
        <Tag color="blue" closable onClose={() => unlink('facebook.com')}>
          <Icon icon="facebook" /> Connected
        </Tag>
      )}

      <div className="mt-2">
        {!isConnected['google.com'] && (
          <Button block color="green" onClick={linkGoogle}>
            <Icon icon="google" /> Link to Google
          </Button>
        )}
        {!isConnected['facebook.com'] && (
          <Button block color="blue" onClick={linkFacebook}>
            <Icon icon="facebook" /> Link to Facebook
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProviderBlock;
