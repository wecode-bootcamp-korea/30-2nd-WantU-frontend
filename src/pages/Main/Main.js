import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Figure from './Figure';
import API from '../../config';
import './Main.scss';

function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const [recruits, setRecruits] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [sort, setSort] = useState('id');
  const [area, setArea] = useState('');
  const [tag, setTag] = useState(0);
  const [category, setCategory] = useState(0);
  const [page, setPage] = useState(1);

  const kakaoCode = location.search.split('=')[1];
  const kakaoUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3000/&code=${kakaoCode}`;

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    let addPath = `?sort=${sort}&area=${area}&tag=${tag}&category=${category}`;
    fetch(`${API.jobs}${addPath}`)
      .then(res => res.json())
      .then(data => {
        setRecruits(data.results.list_data);
        setTotalCount(data.results.total_count);
      });
  }, [sort, area, tag, category]);

  useEffect(() => {
    let addPath = `?sort=${sort}&area=${area}&tag=${tag}&category=${category}&offset=${
      (page - 1) * 8
    }&limit=${page * 8}`;
    fetch(`${API.jobs}${addPath}`)
      .then(res => res.json())
      .then(data => {
        setRecruits(data.results.list_data);
        setTotalCount(data.results.total_count);
      });
  }, [page]);

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
    fetch(API.login, {
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

  const pageUp = () => {
    setPage(prev => {
      if (prev * 8 < totalCount) {
        return prev + 1;
      } else {
        return prev;
      }
    });
  };

  const pageDown = () => {
    setPage(prev => {
      if (prev > 1) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  };

  return (
    <div className="main">
      <div className="subNav">
        <div className="inner">
          <h2 className="subTitle">개발</h2>
          <div
            onClick={e => {
              setCategory(e.target.id);
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
            <option value="0">-- Tags --</option>
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
              setArea(() => {
                if (e.target.value === '-- 지역 --') {
                  return '';
                } else {
                  return e.target.value;
                }
              });
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
            <option value="id">최신순</option>
            <option value="title">제목 오름차순</option>
            <option value="-title">제목 내림차순</option>
            <option value="due_date">마감일 오름차순</option>
            <option value="-due_date">마감일 내림차순</option>
            <option value="-id">등록일순</option>
          </select>
        </div>
      </section>
      <Figure recruits={recruits} />
      <div className="pagination">
        <button onClick={pageDown}>PREV</button>
        <button onClick={pageUp}>NEXT</button>
      </div>
    </div>
  );
}

export default Main;
