import type { NextPage } from 'next';
import { Meta } from '../components/ui';
import { useRouter } from 'next/router';
import { LoginForm, RegisterForm } from '../components';
// import { useRouting } from '@/hooks';

const Login: NextPage = () => {
  //   useRouting();
  const router = useRouter();
  return (
    <Meta title="Register page" description="Register page">
      <RegisterForm router={router} />
    </Meta>
  );
};

export default Login;
