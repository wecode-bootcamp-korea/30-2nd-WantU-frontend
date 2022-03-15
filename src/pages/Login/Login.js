import React from 'react';
import './Login.scss';

const kauthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3000/&response_type=code`;

function Login({ closeModal }) {
  return (
    <section className="login" onClick={closeModal}>
      <div className="wrapper" onClick={e => e.stopPropagation()}>
        <div className="top">
          <h1 className="title">WantU</h1>
          <span className="closeBtn" onClick={closeModal}>
            x
          </span>
        </div>
        <p className="info">직장인을 위한</p>
        <p className="info-add">커리어 플랫폼, 원츄!</p>
        <p className="detail">커리어 성장과 행복을 위한 여정</p>
        <p className="detail-add">지금 원츄에서 시작하세요.</p>

        <form>
          <p className="kakao">카카오</p>
          <input className="email" placeholder="카카오 계정을 입력해 주세요." />
          <p className="or">or</p>
          <div className="sns">
            <button
              type="button"
              className="kakao-btn"
              onClick={() => (window.location.href = kauthUrl)}
            >
              <i className="fa fa-comment" aria-hidden="true" />
            </button>

            <span className="btn-name">kakao</span>
          </div>
          <p className="worry">
            걱정마세요! 여러분의 지원 활동은 kakao에 노출되지 않습니다.
          </p>
          <p className="agree">
            회원가입 시 <a href="/">개인정보 처리방침</a>과{' '}
            <a href="/">이용약관</a>을 확인하였으며, 동의합니다.
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
