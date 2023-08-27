import type { NextPage } from 'next';
import { Meta } from '../components/ui';
import { useRouter } from 'next/router';
import { RegisterForm } from '../components';
import { useRouting } from '../hooks';

const Register: NextPage = () => {
  useRouting();
  const router = useRouter();
  return (
    <Meta title="Register page" description="Register page">
      <RegisterForm router={router} />
    </Meta>
  );
};

export default Register;
