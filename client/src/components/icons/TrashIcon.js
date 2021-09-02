import React from "react";

const TrashIcon = ({ className, primaryColor, secondaryColor }) => {
  return (
<svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 6V4H15V6H9ZM7 6H4C3.44772 6 3 6.44772 3 7C3 7.55228 3.44772 8 4 8H8H16H20C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6H17V3.5C17 2.67157 16.3284 2 15.5 2H8.5C7.67157 2 7 2.67157 7 3.5V6Z" fill="#00b7fd"/>
<path d="M6 11V20.5C6 20.7761 6.22386 21 6.5 21H17.5C17.7761 21 18 20.7761 18 20.5V16.3333V11" stroke={primaryColor} stroke-width="2" stroke-linecap="round"/>
</svg>

  );
};

export default TrashIcon;
