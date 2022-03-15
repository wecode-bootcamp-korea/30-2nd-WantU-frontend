import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

function Main() {
  const location = useLocation();
  const navigate = useNavigate();
  const kakaoCode = location.search.split('=')[1];
  const kakaoUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3000/&code=${kakaoCode}`;

  const getToken = () => {
    if (!location.search) return;

    fetch(kakaoUrl, {
      method: 'POST',
      body: {},
    })
      .then(res => res.json())
      .then(res => {
        if (res.access_token) {
          sendToken(res.access_token);
        } else {
          alert('다시 시도해주세요!');
        }
      });
  };

  const sendToken = kakaoToken => {
    fetch('http://10.58.2.143:8000/users/kakao/login', {
      method: 'GET',
      headers: {
        Authorization: kakaoToken,
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.results) {
          localStorage.setItem('token', res.results.token);
          alert(`${res.results.kakao_nickname}님 환영합니다!`);
          navigate('/');
        }
      });
  };

  useEffect(() => {
    getToken();
  }, []);

  return <div>Main</div>;
}

export default Main;
