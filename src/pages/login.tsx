import type { NextPage } from 'next';
import { Meta } from '../components/ui';
import { LoginForm } from '../components';
import { useRouter } from 'next/router';
import { useRouting } from '../hooks';

const Login: NextPage = () => {
  useRouting();
  const router = useRouter();
  return (
    <Meta title="Login page" description="Login page">
      <LoginForm router={router} />
    </Meta>
  );
};

export default Login;
