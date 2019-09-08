import React, { Component, useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeToggle = () => {
    const {toggleTheme} = useContext(ThemeContext)
    return (
        <button onClick={ toggleTheme }>Toggle The theme</button>
    );
}

// class ThemeToggle extends Component {
//     static contextType = ThemeContext;
//     render(){
//         const {toggleTheme} = this.context;

//         return(
//             <button onClick={ toggleTheme }>Toggle The theme</button>
//         )
//     }
    
// }

export default ThemeToggle;