import React from 'react';


const CancelIcon = ({className , primaryColor, secondaryColor}) => {
    return (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.00003 5.00002L19 19" stroke={primaryColor} stroke-width="2.5" stroke-linecap="round"/>
        <path d="M5.00003 19L11.3 12.7" stroke={primaryColor} stroke-width="2.5" stroke-linecap="round"/>
        <path d="M18.9999 5L14.8 9.2" stroke={secondaryColor} stroke-width="2.5" stroke-linecap="round"/>
        </svg>
        
        
        
    );
};

export default CancelIcon;