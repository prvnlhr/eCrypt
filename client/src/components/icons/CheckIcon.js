import React from 'react';
// import CheckIcon from "../icons/CheckIcon";
// <CheckIcon className={styles.checkIcon}/>
const CheckIcon = ({className , primaryColor, secondaryColor}) => {
    return (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.1619 10.0808L21.1924 6.05025" stroke={secondaryColor} stroke-width="2.5" stroke-linecap="round"/>
        <path d="M13.8031 13.4395L8.11092 19.1317C7.91566 19.327 7.59907 19.327 7.40381 19.1317L6.90884 18.6368L3.51472 15.2426" stroke={primaryColor} stroke-width="2.5" stroke-linecap="round"/>
        </svg>
        
    );
};

export default CheckIcon;