import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Figure from './Figure';
import './Main.scss';

function Main() {
  const location = useLocation();
  const navigate = useNavigate();
  const [recruits, setRecruits] = useState([]);
  const [sort, setSort] = useState(0);
  const [area, setArea] = useState('');
  const [tag, setTag] = useState(0);
  const [category, setCategory] = useState(0);
  const kakaoCode = location.search.split('=')[1];
  const kakaoUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3000/&code=${kakaoCode}`;

  useEffect(() => {
    fetch(`http://10.58.2.143:8000/jobs`)
      .then(res => res.json())
      .then(data => setRecruits(data.results));
  }, []);

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

  useEffect(() => {
    let addPath = `?sort=${sort}&area=${area}&tag=${tag}&category=${category}`;
    fetch(`http://10.58.2.143:8000/jobs${addPath}`)
      .then(res => res.json())
      .then(data => setRecruits(data.results));
  }, [sort, area, tag, category]);

  return (
    <>
      <div className="subNav">
        <div className="inner">
          <h2 className="subTitle">개발</h2>
          <div
            onClick={e => {
              setCategory(e.target.id);
              console.log(e.target.id);
            }}
            className="wrap"
          >
            <p id="0" className="categoryName">
              All
            </p>
            <p id="1" className="categoryName">
              Web Backend
            </p>
            <p id="2" className="categoryName">
              Web Frontend
            </p>
            <p id="3" className="categoryName">
              DevOps
            </p>
            <p id="4" className="categoryName">
              AI
            </p>
            <p id="5" className="categoryName">
              Blockchain
            </p>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="bind">
          <select
            onChange={e => setTag(e.target.value)}
            name="tag"
            className="tag"
          >
            <option>-- Tags --</option>
            <option value="1"># 자율 복장</option>
            <option value="2"># 야근 없음</option>
            <option value="3"># 위워크</option>
            <option value="4"># 연봉 업계 평균 이상</option>
            <option value="5"># 50명 이하</option>
            <option value="6"># 설립 10년 이상</option>
            <option value="7"># 맥주</option>
          </select>
          <select
            onChange={e => {
              setArea(e.target.value);
            }}
            className="area"
            name="area"
          >
            <option>-- 지역 --</option>
            <option>미국</option>
            <option>서울</option>
            <option>경기</option>
          </select>
        </div>
        <div className="filter" name="sort">
          <select
            onChange={e => {
              setSort(e.target.value);
            }}
            className="detailFilter"
          >
            <option value="1">제목 오름차순</option>
            <option value="2">제목 내림차순</option>
            <option value="3">마감일 오름차순</option>
            <option value="4">마감일 내림차순</option>
            <option value="5">등록일순</option>
          </select>
        </div>
      </section>
      <Figure recruits={recruits} />
    </>
  );
}

export default Main;
