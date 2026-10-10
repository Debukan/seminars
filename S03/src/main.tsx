import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App'

const rootElement = document.getElementById('root')

if (rootElement === null) {
    throw new Error('Не найден элемент root')
}

createRoot(rootElement).render(
    <App/>
)
