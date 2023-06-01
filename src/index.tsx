import React from 'react';
import ReactDOM from 'react-dom/client';
// import 'reset-css'
import 'animate.css'
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import ArticleListDataProvider from './components/Context/ArticleListDateProvider';
import { ConfigProvider } from 'antd';
import UserDataProvider from './components/UserDataProvider';
import PageDataProvider from './components/PageDataProvider';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ConfigProvider
    theme={{ token: { colorPrimary: '#2196F3', borderRadius: 43 } }}>
    <Provider store={store}>
      <BrowserRouter>
        <ArticleListDataProvider>
          <UserDataProvider>
            <PageDataProvider>

              <App />
            </PageDataProvider> 
          </UserDataProvider>
        </ArticleListDataProvider>
      </BrowserRouter>
    </Provider>
  </ConfigProvider>

);


reportWebVitals();
