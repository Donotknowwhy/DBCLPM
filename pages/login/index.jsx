import {Form, Input, Button, Checkbox, Row, Col} from 'antd';
import {useRouter} from 'next/router';
import SocialLogin from '../../components/SocialLogin';
import React, {useState} from 'react';
import {signIn} from '../../api/firebase-client';
import styles from './index.module.scss';
import PublicLayout from '../../layouts/PublicLayout';
import Link from 'next/link';
import Head from 'next/head'

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const login = () => signIn(email, password)
      .then(() => {
        router.push('/');
      })
      .catch(function(error) {
        // Handle Errors here.
        const errorMessage = error.message;
        // ...
        window.alert(errorMessage);
      });

  // const login = () => {
  //   router.push('/')
  // }


  return (
    <PublicLayout>
      <Head>
        <title>Đăng nhập</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <h2 className={styles.formTitle}>Đăng nhập</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{remember: true}}
          onFinish={(e) => e.preventDefault() && false}
        >
          <Form.Item
            name="email"
            rules={[
              {required: true, message: 'Không được để trống trường này'},
            ]}
          >
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {required: true, message: 'Không được để trống trường này'},
            ]}
          >
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Ghi nhớ</Checkbox>
          </Form.Item>

          <Form.Item>
            <Row className={styles.formContainer}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
                onClick={login}
              >
                Đăng nhập
              </Button>
            </Row>
          </Form.Item>
        </Form>
        <Row>
          <Col span={12}>
            <Link href="/#" variant="body2">
              <a>Quên mật khẩu?</a>
            </Link>
          </Col>
          <Col span={12}>
            <div>
              <span className={styles.formReg}>
                {'Chưa có tài khoản? '}
              </span>
              <Link href="/#" variant="body2">
                <a>Đăng kí ngay</a>
              </Link>
            </div>
          </Col>
        </Row>
        <Row className={styles.formContainer}>
          <div className={styles.formDivSpan}>
            <span className={styles.formSpan}>
              Hoặc
            </span>
          </div>
        </Row>
        <SocialLogin/>
      </div>
    </PublicLayout>
  );
}

export default Login;
