import React from 'react';
import styles from './Login.module.css';
import { Form, Input, Button, Card, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/reducers/auth';
import { useLoginMutation } from '../../redux/services/endpoints';

const Login = () => {
  const dispatch = useDispatch();
  
  const [login] = useLoginMutation();
  const [error, setError] = React.useState<string>('')

  const onFinish = (values: any) => {
    setError('');
    login(values).unwrap().then(res => {
      localStorage.setItem('token', res.accessToken)
      dispatch(setToken(res.accessToken));
    }).catch(() => {
      setError("Invalid email or password")
    })
  };

  return (
    <div className={styles.body}>
      <Card title="Login" className={styles.card}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          {error && (<Alert message={error} type="error" showIcon closable afterClose={() => setError('')} style={{marginBottom: '20px'}} />)}
          <Form.Item
            name="email"
            validateTrigger="onSubmit"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
              {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'The input is not valid E-mail!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.loginButton}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login; 