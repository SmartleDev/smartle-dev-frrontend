import React from 'react';
import styles from '../../styles/modules/popOutImage.module.scss';
interface Props{
    image: string;
    imageTop?: any;
    imageLeft?: any;
    imagePos?: any; 
    imageSize?: any;
    imageWidth?: any;
    circleBg?: any;
    imageOverflow?: any;
    borderColor?: any;
    circleShadow?: any;
    extraClasses?: any;

}
const PopOutCircle = ({ image, imageTop='3rem', imageLeft='0rem', imagePos='left top', circleBg='bg-accent-200', imageOverflow='hidden', borderColor='purple', imageSize='4', circleShadow='16px 16px 16px #00000033', extraClasses="", imageWidth="100%"}:Props) => {      
    
    let style = {
        "--image-url": `url("${image}")`,
        "--image-top": `${imageTop}`,
        "--image-left": `${imageLeft}`,  
        "--image-pos": `${imagePos}`,
        "--image-overflow": `${imageOverflow}`,
        "--image-size": `${imageSize}`,        
        "--image-width": `${imageWidth}`,        
        "--circle-shadow": `${circleShadow}`,
    } as React.CSSProperties;

    return (
        <div  style={style} className={`${extraClasses} md:m-auto ${borderColor==='blue' ? styles.contrastBorder : ''} ${styles.box} `}>
            <div className={`${styles.circle} z-20 rounded-full ${circleBg}`}></div>
            <div className={`rounded-b-full z-30 ${styles.image}`}></div>
        </div>  
    )
}

export default PopOutCircle;
