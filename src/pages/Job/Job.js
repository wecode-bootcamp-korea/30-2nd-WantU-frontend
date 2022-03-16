import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApplyForm from './ApplyForm/ApplyForm';
import './Job.scss';

const Job = () => {
  const [jobData, setJobData] = useState({});
  const [userData, setUserData] = useState({});
  const [position, setPosition] = useState(0);
  const [isForm, setIsForm] = useState(false);
  const [applier, setApplier] = useState({ name: '', email: '', phone: '' });
  const [newFile, setNewFile] = useState({});

  const { id } = useParams();

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`http://10.58.2.143:8000/jobs/${id}`, {
      method: 'GET',
      headers: { Authorization: token },
    })
      .then(res => res.json())
      .then(data => setJobData(data.results));

    if (token) {
      fetch(`http://10.58.2.143:8000/jobs/${id}/user`, {
        method: 'GET',
        headers: { Authorization: token },
      })
        .then(res => res.json())
        .then(data => setUserData(data.results));
    }
  }, []);

  useEffect(() => {
    if (userData.kakao_email) {
      setApplier({
        ...applier,
        name: userData.kakao_nickname,
        email: userData.kakao_email,
      });
    }
  }, [userData]);

  useEffect(() => {
    if (newFile.name) {
      let formData = new FormData();
      formData.append('filename', newFile);
      fetch('http://10.58.5.194:8000/cv', {
        method: 'POST',
        headers: {
          Authorization: token,
        },
        body: formData,
      })
        .then(res => res.json())
        .then(result => {
          if (result.message === 'upload success') {
            fetch('http://10.58.5.194:8000/cv/list', {
              method: 'GET',
              headers: {
                Authorization: token,
              },
            })
              .then(res => res.json())
              .then(data => {
                setUserData({ ...userData, resumes: data.result });
              });
          } else {
            alert('파일 업로드에 실패했습니다. 다시 시도해주세요.');
          }
        });
    }
  }, [newFile]);

  const slideLeft = () => {
    setPosition(prev => {
      if (prev === 0) {
        return jobData.images.length - 1;
      } else {
        return prev - 1;
      }
    });
  };

  const slideRight = () => {
    setPosition(prev => {
      if (prev === jobData.images.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  };

  const openForm = () => {
    if (token) {
      setIsForm(true);
    } else {
      alert('로그인해주세요.');
    }
  };

  const closeForm = () => {
    setIsForm(false);
  };

  const handleInput = event => {
    const { name, value } = event.target;
    setApplier({ ...applier, [name]: value });
  };

  const handleFileInput = event => {
    setNewFile(event.target.files[0]);
  };

  const submitForm = uuid => {
    fetch('http://10.58.5.194:8000/applications/submission', {
      method: 'POST',
      headers: { Authorization: token },
      body: JSON.stringify({
        job_position_id: id,
        uuid,
        name: applier.name,
        phone: applier.phone,
      }),
    })
      .then(res => res.json())
      .then(result => {
        if (result.message === 'Successfully Applied') {
          alert('지원 완료!');
          setIsForm(false);
          setUserData({ ...userData, is_applied: true });
        }
      });
  };

  const isValid = applier.name && applier.phone;

  if (!jobData.company_name) {
    return null;
  }

  return (
    <main className="job">
      <article>
        <div className="slider">
          <ul
            style={{
              width: `${jobData.images.length * 100}%`,
              marginLeft: `${-position * 100}%`,
            }}
          >
            {jobData.images.map((url, index) => (
              <li
                key={index}
                style={{ width: `calc(100% / ${jobData.images.length})` }}
              >
                <div
                  className="articleThumbnail"
                  style={{ backgroundImage: `url(${url})` }}
                />
              </li>
            ))}
          </ul>
          <i
            className="fa fa-angle-left slideLeft"
            aria-hidden="true"
            onClick={slideLeft}
          />
          <i
            className="fa fa-angle-right slideRight"
            aria-hidden="true"
            onClick={slideRight}
          />
        </div>

        <h1 className="articleTitle">{jobData.title}</h1>
        <div>
          <span className="companyName">{jobData.company_name}</span>
          <span className="companyLocation">
            | {jobData.company_location.split(' ')[1]} ・{' '}
            {jobData.company_location.split(' ')[0]}
          </span>
        </div>
        <div className="companyTags">
          {jobData.tags.map((tag, index) => (
            <span key={index} className="companyTag">
              {tag}
            </span>
          ))}
        </div>
        <p className="articleContent">{jobData.content}</p>
        <hr />
        <div className="articleInfo">
          <span className="infoLabel">마감일</span>
          <span>{jobData.due_date}</span>
          <span className="infoLabel">근무지역</span>
          <span>{jobData.company_location}</span>
        </div>
        <div className="caution">
          <span className="exclamation">!</span>
          <p>
            본 채용정보는 원츄의 동의없이 무단전재, 재배포, 재가공할 수 없으며,
            구직활동 이외의 용도로 사용할 수 없습니다.
          </p>
        </div>
      </article>

      {isForm ? (
        <ApplyForm
          user={userData}
          closeForm={closeForm}
          handleInput={handleInput}
          isValid={isValid}
          applier={applier}
          submitForm={submitForm}
          handleFileInput={handleFileInput}
        />
      ) : (
        <aside className="sideBar">
          <div className="salaryInfo">
            <span>평균 연봉</span>
            <span className="salary">
              {parseInt(jobData.company_average_salary * 10000).toLocaleString(
                'ko-KR'
              )}
              원
            </span>
          </div>
          <button
            className="applyBtn"
            onClick={openForm}
            disabled={userData.is_applied}
          >
            {userData.is_applied ? '지원완료' : '지원하기'}
          </button>
          <button className="likeBtn">
            <span className="heart">♥︎</span>
            <span>0</span>
          </button>
        </aside>
      )}
    </main>
  );
};

export default Job;
