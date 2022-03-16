import React, { useState } from 'react';
import './ApplyForm.scss';

const ApplyForm = ({
  closeForm,
  handleInput,
  isValid,
  applier,
  user,
  submitForm,
  handleFileInput,
}) => {
  const [checked, setChecked] = useState('');

  console.log(applier);

  return (
    <aside className="applyForm">
      <header className="applyHeader">
        <span>지원하기</span>
        <span className="closeBtn" onClick={closeForm}>
          뒤로
        </span>
      </header>
      <div className="scrollBox">
        <div className="applyNotice">
          <span>주요 업무 내용을 한 번 더 확인해 주세요.</span>
          <span>직무와 맞는 포지션일수록 서류합격률이 높아져요!</span>
        </div>
        <div className="applyInfo">
          <span className="formTitle">지원 정보</span>
          <div className="formRow">
            <span className="rowLabel">이름</span>
            <input
              value={applier.name}
              name="name"
              onChange={handleInput}
              className="rowInput"
            />
          </div>
          <div className="formRow">
            <span className="rowLabel">이메일</span>
            <span>{user.kakao_email}</span>
          </div>
          <div className="formRow">
            <span className="rowLabel">휴대폰 번호</span>
            <input
              value={applier.phone}
              name="phone"
              placeholder="휴대폰 번호를 입력해주세요."
              onChange={handleInput}
              className="rowInput"
            />
          </div>
        </div>
        <div className="applyInfo">
          <span className="formTitle">첨부파일</span>
          {user.resumes.map((resume, index) => (
            <div key={index} className="uploadedFile">
              <input
                type="checkbox"
                id={resume.uuid}
                onChange={event => {
                  if (event.target.checked) {
                    setChecked(event.target.id);
                  } else {
                    setChecked('');
                  }
                }}
                checked={resume.uuid === checked ? true : false}
              />
              <div className="fileInfo">
                <span className="fileName">{resume.name}</span>
                <span className="fileDate">
                  {resume.created_at.split('T')[0]}
                </span>
              </div>
            </div>
          ))}

          <label htmlFor="fileInput" className="uploadBtn">
            파일 업로드
          </label>
          <input
            id="fileInput"
            type="file"
            accept=".pdf"
            onChange={handleFileInput}
          />
          <p className="noticeText">
            원츄에서 지원하면 최종 합격률이 40% 높아집니다.
          </p>
        </div>
      </div>

      <footer className="applyFooter">
        <button
          className={isValid ? 'applyBtn' : 'applyBtn inactiveBtn'}
          disabled={!isValid}
          onClick={() => {
            if (checked) {
              submitForm(checked);
            }
          }}
        >
          제출하기
        </button>
      </footer>
    </aside>
  );
};

export default ApplyForm;
