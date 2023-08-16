import type { NextPage } from 'next';
import { Meta } from '../components/ui';
import { LoginForm } from '../components';
// import { useRouting } from '@/hooks';

const Login: NextPage = () => {
  //   useRouting();
  return (
    <Meta title="Login page" description="Login page">
      <LoginForm />
    </Meta>
  );
};

export default Login;
