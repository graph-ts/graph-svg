import React from 'react';
import ReactDOM from 'react-dom';
import { ExampleExplorer } from './explorer/ExampleExplorer';
import './index.scss';

ReactDOM.render(
    <React.StrictMode>
        <ExampleExplorer/>
    </React.StrictMode>,
    document.getElementById('root')
);