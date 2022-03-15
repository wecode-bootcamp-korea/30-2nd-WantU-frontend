import React from 'react';
import './Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="inner">
        <div className="wrap">
          <div className="left-side">
            <div className="logo">
              <img className="logo-img" src="/images/wantu.png" alt="logo" />
              <h1>WantU</h1>
            </div>
            <ul className="footer-list">
              <li>기업소개</li>
              <li>이용약관</li>
              <li>개인정보 처리방침</li>
              <li>고객센터</li>
            </ul>
          </div>
          <div className="right-side">
            <img src="/images/social_instagram.png" alt="instagram" />
            <img src="/images/social_youtube.png" alt="youtube" />
            <img src="/images/social_facebook.png" alt="facebook" />
            <img src="/images/social_blog.png" alt="blog" />
            <img src="/images/social_kakao.png" alt="kakao" />
            <img src="/images/social_post.png" alt="post" />
            <img src="/images/social_apple.png" alt="apple" />
            <img src="/images/social_google.png" alt="google" />
          </div>
        </div>
        <div className="txt">
          <div className="left-txt">
            <p>
              (주)원티드랩 (대표이사:이복기) | 서울특별시 송파구 올림픽로 300
              롯데월드타워 35층 | 통신판매번호 : 2020-서울송파-3147
            </p>
            <p>
              유료직업소개사업등록번호 : (국내) 제2020-3230259-14-5-00018호 |
              (국외) 서울동부-유-2020-2 | 사업자등록번호 : 299-86-00021 |
              02-539-7118
            </p>
            <p>© Wantedlab, Inc.</p>
          </div>
          <div className="right-txt" />
          <select>
            <option value="kr">🇰🇷 한국 (한국어)</option>
            <option value="jp">🇯🇵 日本 (日本語)</option>
            <option value="us">🇺🇸 America (English)</option>
            <option value="sp">🇸🇬 Singapore (English)</option>
          </select>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
