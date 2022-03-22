import React, { useState } from 'react';
import FileMenu from '../FileMenu/FileMenu';
import './Resume.scss';

const Resume = ({ modifyName, deleteFile, download, fileLoad, data }) => {
  const { uuid, name, created_date } = data;
  const [menuToggle, setMenuToggle] = useState(false);
  const [changedName, setChangedName] = useState(name);

  const handleFileName = event => {
    let newValue = event.target.value;
    setChangedName(() => {
      if (newValue.includes('.' + name.split('.')[1], newValue.indexOf('.'))) {
        return newValue;
      } else {
        return newValue + '.' + name.split('.')[1];
      }
    });
  };

  const closeMenu = () => {
    setMenuToggle(false);
  };

  return (
    <div className="resume resumeUpload">
      <div className="resumeInfo">
        <input
          className="uploadFile"
          value={changedName}
          onChange={event => {
            handleFileName(event);
          }}
        />
        <p className="uploadDate">{created_date}</p>
      </div>
      <div className="resumeControl">
        <span>
          <i className="fa fa-file-text-o" aria-hidden="true" />
          &nbsp; 첨부 완료
        </span>
        <i
          className="fa fa-ellipsis-v"
          aria-hidden="true"
          onClick={() => {
            setMenuToggle(!menuToggle);
          }}
        />
        {menuToggle && (
          <FileMenu
            closeMenu={closeMenu}
            download={download}
            modifyName={modifyName}
            changedName={changedName}
            deleteFile={deleteFile}
            fileLoad={fileLoad}
            uuid={uuid}
          />
        )}
      </div>
    </div>
  );
};

export default Resume;
