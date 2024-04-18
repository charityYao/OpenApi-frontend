// src/pages/UserInfo/index.tsx
import React, { useState, useEffect } from 'react';
import { getLoginUserUsingGET } from '@/services/yuapi-backend/userController';
import { PageContainer, ProDescriptions } from '@ant-design/pro-components';
import dayjs from 'dayjs';
const UserInfoPage: React.FC = () => {
    const [user, setUser] = useState<API.UserVO2 | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUser = async () => {
        setLoading(true);
        try {
          const response = await getLoginUserUsingGET();
          if (response.data) {
            // 直接使用 response.data，因为它已经包含了 accessKey 和 secretKey
            setUser(response.data);
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUser();
    }, []);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User information not available.</div>;
  }
  // 使用 dayjs 格式化创建时间
  const formattedCreateTime = dayjs(user.createTime).format('YYYY-MM-DD HH:mm:ss');

  return (
    <PageContainer>
      <ProDescriptions title="用户信息" layout="vertical" bordered>
        <ProDescriptions.Item label="账号">{user.userAccount}</ProDescriptions.Item>
        <ProDescriptions.Item label="性别">{user.gender === 1 ? '男' : '女'}</ProDescriptions.Item>
        <ProDescriptions.Item label="角色">{user.userRole}</ProDescriptions.Item>
        <ProDescriptions.Item label="创建时间">{formattedCreateTime}</ProDescriptions.Item>
        <ProDescriptions.Item label="Access Key">{user.accessKey}</ProDescriptions.Item>
        <ProDescriptions.Item label="Secret Key">{user.secretKey}</ProDescriptions.Item>
      </ProDescriptions>
    </PageContainer>
  );
};

export default UserInfoPage;
