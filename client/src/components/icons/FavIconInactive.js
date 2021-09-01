import React from 'react';

const FavIconInactive = ({className}) => {
    return (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 1V7" stroke="#0075FF" stroke-width="2" stroke-linecap="round"/>
        <path d="M17 4H23" stroke="#0075FF" stroke-width="2" stroke-linecap="round"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.75 2H5C3.89543 2 3 2.89543 3 4V21.7681C3 23.3387 4.72719 24.2964 6.05932 23.4646L10.7501 20.5355L15.4427 23.465C16.7749 24.2966 18.5018 23.3388 18.5018 21.7684V9.7974H16.5018V21.7684L11.8092 18.8389C11.161 18.4343 10.3389 18.4343 9.69076 18.839L5 21.7681V4L12.75 4V2Z" fill="#9BAECE"/>
        </svg>
        
    );
};

export default FavIconInactive;