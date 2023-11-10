import { useEffect } from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';
import {
  setTokenToLocalStorage,
  useFilteredPostsQuery,
  useGetFeedQuery,
} from '@/pages/api/base-api';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { useRouter } from 'next/navigation';

function Home() {
  const { t } = useTranslation();
  const { data: feed } = useGetFeedQuery();
  const { data, error } = useFilteredPostsQuery();
  const router = useRouter();

  console.log(data);
  //   console.log('router.locales: ', router.locales);
  //   console.log('router.locale: ', router.locale);
  //   console.log('router.defaultLocale: ', router.defaultLocale);
  /*  useEffect(() => {
      feed();
    }, []);*/
  const logOut = () => {
    setTokenToLocalStorage(null);
  };

  useEffect(() => {
    if (error) {
      if (error.status === 401) {
        router.push('/signIn');
      }
      console.log(error);
    }
  }, [error]);

  return (
    <>
      <HeadMeta title={'main'} />
      <div>adf</div>
      <div>
        {error?.status} {JSON.stringify(error)}
      </div>
      <button onClick={logOut}>logout</button>
    </>
  );
}

Home.getLayout = getLayout;
export default Home;
