import { useAppSelector } from '@/pages/api/store';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button } from '@/shared/ui/Button';
import Link from 'next/link';

import styles from './header.module.scss';

import { ExpandBtn } from './ExpandBtn';
import { LangSwitcher } from './LangSwitcher';
import { NotificationMenu } from './NotificationMenu';
import { mockedNotifications } from './mockedData';

export type Notification = {
  id: string;
  isNew?: boolean;
  message: string;
  notificationTime: string;
};

export const Header = () => {
  const { t } = useTranslation();

  const { isLoggedIn } = useAppSelector(state => state.authReducer);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>Inctagram</div>
        <div className={styles.flex}>
          {isLoggedIn ? (
            <>
              <NotificationMenu notifications={mockedNotifications} />
              <LangSwitcher />
              <ExpandBtn />
            </>
          ) : (
            <>
              <LangSwitcher />
              <div className={styles['buttons-wrapper']}>
                <Button variant={'text'}>
                  <Link href={'/signIn'}>{t.navbar.signIn}</Link>
                </Button>
                <Button>
                  <Link href={'/signUp'}>{t.navbar.signUp}</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
