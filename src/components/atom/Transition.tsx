import React from 'react';
import { CSSTransition, SwitchTransition } from "react-transition-group";
interface Props{
    children: any;
    index: number;
}
const Transition = ({children, index}:Props) => {
    return (
        <SwitchTransition mode="out-in">
            <CSSTransition                
                classNames="fade"
                addEndListener={(node, done) => {
                    node.addEventListener("transitionend", done, false);
                }}
                key={index}
            >
                <div className="">
                    {children}
                </div>
            </CSSTransition>
        </SwitchTransition>   
    );
}

export default Transition;
