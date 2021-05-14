import {Layout, Row, Col, Card} from 'antd';
import React from 'react';
import {useEffect} from 'react';
import {useRouter} from 'next/router';
import SocialLogin from './../../components/SocialLogin';
import styles from './index.module.scss'
import { getAccessToken } from './../../utils/cookies';
export default function PublicLayout() {
  const router = useRouter();
  const accessToken = getAccessToken();

  useEffect(() => {
    if (accessToken) router.push('/');
  }, []);
  


  return (
    <>
      <Layout className={styles.cover}>
        <Row justify='center'>
          <Card className={styles.card}>
        <SocialLogin/>
          </Card>
        </Row>
      </Layout>
    </>
  );
}
