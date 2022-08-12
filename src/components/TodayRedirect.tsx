import { useRouter } from "next/router"
import { useEffect } from 'react';

const TodayRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/puzzle/today');
  });
};

export default TodayRedirect

