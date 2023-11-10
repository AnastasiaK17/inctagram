import { Controller, useForm } from 'react-hook-form';

import { useLoginMutation } from '@/pages/api/auth.service';
import { baseUrl } from '@/pages/api/base-api';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button } from '@/shared/ui/Button/button';
import { Card } from '@/shared/ui/Card/Card';
import { TextField } from '@/shared/ui/textField/TextField';
import { Typography } from '@/shared/ui/typography';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { z } from 'zod';

import s from 'components/auth/sign-in-form/sign-in-form.module.scss';

import GitHubLogo from '../../../assets/icons/gitHubLogo.svg';
import GoogleLogo from '../../../assets/icons/googleLogo.svg';

const signInSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Enter email'),
  password: z.string().min(3),
});

type FormValuesType = z.infer<typeof signInSchema>;

export const SignInForm = () => {
  const [login] = useLoginMutation();
  const onGoogle = () => {
    window.location.replace(`${baseUrl}/api/v1/auth/google`);
  };

  const { t } = useTranslation();
  const onSubmit = data => {
    login(data);
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(signInSchema),
  });

  return (
    /* eslint-disable */
    <Card className={s.signInFormContainer}>
      <div><Typography.H1>Sign In</Typography.H1></div>
      <div className={s.gitHubGoogleContainer}>
        <GoogleLogo onClick={onGoogle} />
        <GitHubLogo />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => <TextField
            {...field}
            errors={fieldState?.error?.message}
            onChange={field.onChange}
            value={field.value}
            label={"Email"}
            inputtype={"text"} />}
        />
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => <TextField
            {...field}
            onChange={field.onChange}
            placeholder={"password"}
            label={"Password"}
            inputtype={"password"}
            errors={fieldState?.error?.message}
          />}
        />

        <div className={s.linksAndButtonsContainer}>
          <div className={s.forgotPasswordLink}><Link
            href={"/forgotPassword"}><Typography.Regular14
            color={"var(--color-light-900)"}>{t.navbar.forgotPassword}</Typography.Regular14></Link></div>
          <Button style={{ width: "100%" }} type={"submit"}>Sign In</Button>
          <Link href={""}><Typography.Regular16>Don't have an account</Typography.Regular16></Link>
          <Link href={"/signUp"}>Sign Up</Link>
        </div>
      </form>
    </Card>
    /* eslint-enable */
  );
};
