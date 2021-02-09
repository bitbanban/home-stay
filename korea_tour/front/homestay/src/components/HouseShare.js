import React from 'react';
import ShareIcon from '@material-ui/icons/Share';


function HouseShare(props) {

    const doCopy = text => {
        // 흐름 1.
        if (!document.queryCommandSupported("copy")) {
          return alert("복사하기가 지원되지 않는 브라우저입니다.");
        }
    
        // 흐름 2.
        const textarea = document.createElement("textarea");
        textarea.value = text;
        
    
        // 흐름 3.
        document.body.appendChild(textarea);
        // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
        textarea.select();
        // 흐름 4.
        document.execCommand("copy");
        // 흐름 5.
        document.body.removeChild(textarea);
        alert("클립보드에 복사되었습니다.");
      };
    return (
        <div>
            <span id="share" onClick={() => doCopy( window.location.href )}><ShareIcon color="error" /></span>
        </div>
    );
}

export default HouseShare;