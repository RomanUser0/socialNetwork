import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import { store } from './store/store.js'
import './locale/i18n'

ReactDOM.createRoot(document.getElementById('root')).render(
            <Provider store={store}>
                <Suspense fallback={<div>Loading...</div>}>
                    <App />
                </Suspense>
            </Provider>
)
