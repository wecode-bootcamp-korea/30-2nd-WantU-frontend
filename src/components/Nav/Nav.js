import React, { useEffect, useState } from 'react';
import Login from '../../pages/Login/Login';
import { useNavigate } from 'react-router';
import './Nav.scss';

function Nav() {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getToken();
  }, [isLogin]);

  const goToMyPage = () => navigate('/mypage');

  const getToken = () => {
    setToken(localStorage.getItem('token'));
  };

  return (
    <>
      <nav className="nav">
        <div className="inner">
          <div className="leftMenu">
            <div className="dropdown">
              <ul>
                <i className="fa fa-bars" aria-hidden="true">
                  <ul className="mainMenu">
                    <li className="mainList" />
                    <li className="mainList">
                      <a className="mainTxt" href="/">
                        개발
                      </a>
                      <ul className="subMenu">
                        <li className="subList" />
                        {SUB_MENUS.map(menu => (
                          <li key={menu.id} className="subList">
                            <a className="subTxt" href="/">
                              {menu.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    {MAIN_MENUS.map(menu => (
                      <li key={menu.id} className="mainList">
                        <a className="mainTxt" href="/">
                          {menu.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </i>
              </ul>
            </div>
            <a href="/">
              <h1 className="logo">WantU</h1>
            </a>
          </div>
          <div className="rightMenu">
            <a href="/">
              <i className="fa fa-search" aria-hidden="true" />
            </a>
            {!token ? (
              <button className="loginBtn" onClick={() => setIsLogin(true)}>
                로그인
              </button>
            ) : (
              <>
                <button
                  className="loginBtn"
                  onClick={() => {
                    localStorage.removeItem('token');
                    getToken();
                    navigate('/');
                  }}
                >
                  로그아웃
                </button>
                <span className="bar">|</span>
                <button className="myBtn" onClick={goToMyPage}>
                  My Page
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
      {isLogin && <Login closeModal={() => setIsLogin(false)} />}
    </>
  );
}

export default Nav;

const SUB_MENUS = [
  { id: 1, text: 'Web Backend' },
  { id: 2, text: 'Web Frontend' },
  { id: 3, text: 'DevOps' },
  { id: 4, text: 'AI' },
  { id: 5, text: 'Blockchain' },
];

const MAIN_MENUS = [
  { id: 1, text: '경영.비즈니스' },
  { id: 2, text: '마케팅.광고' },
  { id: 3, text: '디자인' },
  { id: 4, text: '게임 제작' },
];
