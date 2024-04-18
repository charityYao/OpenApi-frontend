import Footer from '@/components/Footer';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Link, history, useModel } from '@umijs/max';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import styles from './index.less';
import { userRegisterUsingPOST } from '@/services/yuapi-backend/userController';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};
const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('register'); // 默认显示注册表单
  const [registerLoading, setRegisterLoading] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');

  const handleSubmit = async (values: API.UserRegisterRequest) => {
    setRegisterLoading(true);
    try {
      // 注册
      const res = await userRegisterUsingPOST(values);
      if (res.data) {
        // 注册成功，可以跳转到登录页面或其他页面
        message.success('注册成功！');
        // 这里可以添加跳转逻辑，例如重定向到登录页面
        history.push('/user/login');
      }
    } catch (error) {
      // 处理网络或其他错误
      message.error(error.message);
    } finally {
      setRegisterLoading(false);
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
                    logo={<img alt="logo" src="/logo.svg" />}
                    title="OpenAPI开放接口"
                    subTitle={'API 开放平台'}
                    initialValues={{
                      autoLogin: true,
                    }}
                    onFinish={async (values) => {
                      await handleSubmit(values as API.UserRegisterRequest);
                    }}          
        >
          {/* 更新表单字段以适应注册需求 */}
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'register',
                label: '注册',
              },
            ]}
          />
          {type === 'register' && (
            <>
              {/* 注册表单字段 */}
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'用户名: admin'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'密码: admin'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />, 
                }}
                placeholder={'确认密码: admin'}
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
          
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>

            <Link
              style={{
                float: 'right',
              }}
              to={'/user/login'}
            >
              已有账号？去登录
            </Link>
          </div>
        </LoginForm>
        
      </div>
      <Footer />
    </div>
  );
};

export default Login;
