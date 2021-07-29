import * as React from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';

import App from 'App';

import './styles.modules.scss';
import './scss/global.scss';

render(<App />, document.getElementById('root'));
