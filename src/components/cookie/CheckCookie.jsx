import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

const CheckCookie = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  const [cookie, setCookieState] = useState('');

  useEffect(() => {
    setCookieState(cookies.access_token || 'Cookie not found');
  }, [cookies]);

  return (
    <div>
      <h1>Cookie Value: {cookie}</h1>
    </div>
  );
};

export default CheckCookie;
