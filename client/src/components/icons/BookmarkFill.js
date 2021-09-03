import React from "react";

const BookmarkFill = ({ className, primaryColor, secondaryColor }) => {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 3.5V20.8935C5 22.0501 6.25363 22.7715 7.25363 22.1905L11.2464 19.8703C11.7123 19.5996 12.2877 19.5996 12.7536 19.8703L16.7464 22.1905C17.7464 22.7715 19 22.0501 19 20.8935V3.5C19 2.67157 18.3284 2 17.5 2H6.5C5.67157 2 5 2.67157 5 3.5Z" fill={primaryColor}/>
    <path d="M9 8H15" stroke={secondaryColor} stroke-width="2" stroke-linecap="round"/>
    </svg>
    
    
  );
};

export default BookmarkFill;
