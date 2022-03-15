import React, { useState } from 'react';
import Login from '../../pages/Login/Login';
import { useNavigate } from 'react-router';
import './Nav.scss';

function Nav() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const goToMyPage = () => navigate('/mypage');

  return (
    <>
      <nav className="nav">
        <div className="inner">
          <div className="left-menu">
            <div className="dropdown">
              <ul className="menu-btn">
                <i className="fa fa-bars" aria-hidden="true">
                  <ul className="main-menu">
                    <li className="main-list" />
                    <li className="main-list">
                      <a className="main-txt" href="/">
                        개발
                      </a>
                      <ul className="sub-menu">
                        <li className="sub-list" />
                        {SUB_MENUS.map(menu => (
                          <li key={menu.id} className="sub-list">
                            <a className="sub-txt" href="/">
                              {menu.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    {MAIN_MENUS.map(menu => (
                      <li key={menu.id} className="main-list">
                        <a className="main-txt" href="/">
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
          <div className="right-menu">
            <a href="/">
              <i className="fa fa-search" aria-hidden="true" />
            </a>
            <button className="login-btn" onClick={() => setIsLogin(!isLogin)}>
              로그인
            </button>
            <span className="bar">|</span>
            <button className="my-btn" onClick={goToMyPage}>
              My Page
            </button>
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
