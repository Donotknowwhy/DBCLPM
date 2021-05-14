import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import {initFirebase} from '../api/firebase-client';
import {
  removeAccessToken,
  setAccessToken,
  getAccessToken,
  removeRefreshToken,
  setRefreshToken,
  getRefreshToken,
} from './cookies';

import {mapAccessToken, mapRefreshToken, mapUserData} from './map-user-data';

initFirebase();

const useUser = () => {
  const [user, setUser] = useState();
  const router = useRouter();

  const logout = async () => firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        router.push('/login');
      })
      .catch((e) => {
        console.error(e);
      });


  useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date
    const cancelAuthListener = firebase.auth().onIdTokenChanged((user) => {
      if (user) {
        const accessToken = mapAccessToken(user);
        const refreshToken = mapRefreshToken(user);
        const userData = mapUserData(user);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setUser(userData);
      } else {
        removeAccessToken();
        removeRefreshToken();
        setUser();
      }
    });

    const AccessToken = getAccessToken();
    if (!AccessToken) {
      router.push('/login');
      return;
    }
    setUser(AccessToken);

    const RefreshToken = getRefreshToken();
    if (!RefreshToken) {
      router.push('/login');
      return;
    }
    setUser(RefreshToken);


    return () => {
      cancelAuthListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {user, logout};
};

export {useUser};
