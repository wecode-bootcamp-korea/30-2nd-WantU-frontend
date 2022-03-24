import React, { useEffect, useState } from 'react';
import Resume from './Resume/Resume';
import API from '../../config';
import './Mypage.scss';

const Mypage = () => {
  const [files, setFiles] = useState([]);
  const [applications, setApplications] = useState({});
  const [applicationList, setApplicationList] = useState([]);
  const [newFile, setNewFile] = useState({});

  const token = localStorage.getItem('token');

  useEffect(() => {
    fileLoad();
    fetch(API.applications, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
      .then(res => res.json())
      .then(data => setApplications(data.result));
  }, []);

  useEffect(() => {
    if (newFile.name) {
      let formData = new FormData();
      formData.append('filename', newFile);
      fetch(API.cv, {
        method: 'POST',
        headers: {
          Authorization: token,
        },
        body: formData,
      })
        .then(res => res.json())
        .then(result => {
          if (result.message === 'upload success') {
            fileLoad();
          } else {
            alert('파일 업로드에 실패했습니다. 다시 시도해주세요.');
          }
        });
    }
  }, [newFile]);

  const openDetail = category => {
    fetch(`${API.applications}/status/${category}`, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
      .then(res => res.json())
      .then(data => setApplicationList(data.result));
  };

  const handleFileInput = event => {
    setNewFile(event.target.files[0]);
  };

  const download = (uuid, filename) => {
    fetch(`${API.cv_list}/${uuid}`, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
      .then(res => res.json())
      .then(result =>
        fetch(result.message, {
          method: 'GET',
        })
          .then(res => res.blob())
          .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.setAttribute('download', filename);
            a.click();
          })
      );
  };

  const modifyName = (uuid, changedName) => {
    fetch(`${API.cv_list}/${uuid}`, {
      method: 'POST',
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({ name: changedName }),
    }).then(res => {
      if (res.status === 201) {
        alert('이름이 변경되었습니다.');
        fileLoad();
      }
    });
  };

  const deleteFile = uuid => {
    fetch(`${API.cv_list}/${uuid}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    }).then(res => {
      if (res.status === 200) {
        alert('삭제가 완료되었습니다.');
        fileLoad();
      }
    });
  };

  const fileLoad = () => {
    fetch(API.cv_list, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
      .then(res => res.json())
      .then(data => {
        setFiles(data.result);
      });
  };

  const applicationCount = [
    {
      id: 1,
      status: '전체',
      count: applications.total,
      category: 'all',
    },
    {
      id: 2,
      status: '지원 완료',
      count: applications.applied,
      category: 'applied',
    },
    {
      id: 3,
      status: '서류 통과',
      count: applications.document_passed,
      category: 'document_passed',
    },
    {
      id: 4,
      status: '최종 합격',
      count: applications.accepted,
      category: 'accepted',
    },
    {
      id: 5,
      status: '불합격',
      count: applications.rejection,
      category: 'rejection',
    },
  ];

  const applicationStatus = {
    applied: '지원 완료',
    document_passed: '서류 통과',
    accepted: '최종 합격',
    rejection: '불합격',
  };

  return (
    <div className="mypage">
      <section className="apply">
        <h2>지원 현황</h2>
        <div className="statusBox">
          {applicationCount.map(el => (
            <div
              key={el.id}
              className="applyStatus"
              onClick={() => {
                openDetail(el.category);
              }}
            >
              <span className="applyCount">
                {el.count === undefined ? 0 : el.count}
              </span>
              <span>{el.status}</span>
            </div>
          ))}
        </div>
        {applicationList.length > 0 && (
          <>
            <span className="totalApply">총 {applicationList.length}건</span>
            <table className="applyDetail">
              <thead>
                <tr>
                  <th>지원 회사</th>
                  <th>지원 직군</th>
                  <th>지원 일자</th>
                  <th>지원 상태</th>
                </tr>
              </thead>
              <tbody>
                {applicationList.map((detail, index) => (
                  <tr key={index}>
                    <td>{detail.company_name}</td>
                    <td>{detail.category}</td>
                    <td>{detail.applied_date}</td>
                    <td>{applicationStatus[detail.apply_status]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </section>

      <section className="resume">
        <h2>이력서 관리</h2>
        <div className="resumeWrapper">
          <label htmlFor="fileInput">
            <div className="resumeUpload">
              <div className="uploadIcon">
                <i className="fa fa-upload" aria-hidden="true" />
              </div>
              <span>파일 업로드</span>
            </div>
          </label>
          <input
            id="fileInput"
            type="file"
            accept=".pdf"
            onChange={handleFileInput}
          />
          {files.map(file => (
            <Resume
              key={file.uuid}
              data={file}
              modifyName={modifyName}
              deleteFile={deleteFile}
              download={download}
              fileLoad={fileLoad}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Mypage;
