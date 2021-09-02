import React from "react";

const BookmarkPlus = ({ className, primaryColor, secondaryColor }) => {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.6182 3H5.5C5.22386 3 5 3.22386 5 3.5V21.1176C5 21.5061 5.4237 21.7462 5.75696 21.5465L10.743 18.5594C10.9012 18.4646 11.0988 18.4646 11.257 18.5594L16.243 21.5465C16.5763 21.7462 17 21.5061 17 21.1176V12.2432" stroke={primaryColor} stroke-width="2" stroke-linecap="round"/>
    <path d="M18 2V8M15 5H21" stroke={secondaryColor} stroke-width="2" stroke-linecap="round"/>
    </svg>
    
  );
};

export default BookmarkPlus;
