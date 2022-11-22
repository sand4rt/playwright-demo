import { Counter } from './counter/Counter'
import { Login } from './login/Login'
import { Products } from './products/Products'
import './App.css'

export function App() {
  return (
    <div className="app">
      <div className="card">
        <h3>Counter</h3>
        <Counter />
      </div>
      <div className="card">
        <h3>Login form</h3>
        <Login />
      </div>
      <div className="card">
        <h3>Product list</h3>
        <Products />
      </div>
    </div>
  )
};
