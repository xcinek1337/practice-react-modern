import React from 'react';
import ReactDOM from 'react-dom';
import Box from './components/Box';
import Div from './components/Div';

const App = () => {
    return (
        <section>
            <Box />
            <Div />
        </section>
    );
};

ReactDOM.render(<App />, document.querySelector('#root'));
