import {Layout, Row, Col, Card} from 'antd';
import React from 'react';
import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {getAccessToken} from '../utils/cookies';
import styles from './PublicLayout.module.scss';

export default function PublicLayout(props) {
  const accessToken = getAccessToken();
  const router = useRouter();

  useEffect(() => {
    if (accessToken) router.push('/');
  }, []);

  return (
    <>
      
      <Layout className={styles.cover}>
        <Row justify='center'>
          <Card className={styles.card}>
            <div className={styles.formBody}>
              {props.children}
            </div>
          </Card>
        </Row>
      </Layout>
    </>
  );
}
