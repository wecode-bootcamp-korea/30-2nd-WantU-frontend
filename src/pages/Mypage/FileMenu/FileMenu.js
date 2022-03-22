import React from 'react';
import './FileMenu.scss';

const FileMenu = ({
  closeMenu,
  download,
  modifyName,
  deleteFile,
  uuid,
  changedName,
}) => {
  return (
    <div className="fileMenu">
      <button
        onClick={() => {
          modifyName(uuid, changedName);
          closeMenu();
        }}
      >
        이름 변경
      </button>
      <button
        onClick={() => {
          download(uuid, changedName);
          closeMenu();
        }}
      >
        다운로드
      </button>
      <button
        onClick={() => {
          deleteFile(uuid);
          closeMenu();
        }}
      >
        삭제
      </button>
    </div>
  );
};

export default FileMenu;
