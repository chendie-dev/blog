import React from 'react';
import ReactDOM from 'react-dom/client';
import 'reset-css'
import 'animate.css'
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import ArticleListDataProvider from './components/Context/ArticleListDateProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ArticleListDataProvider>

        <App />
      </ArticleListDataProvider>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
