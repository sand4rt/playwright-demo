import { FormEvent } from 'react';

export function Login() {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.history.pushState('', '', 'dashboard');
  }

  return (
    <form onSubmit={submit}>
      <label>
        Username
        <input type="text" name="username" autoFocus />
      </label>
      <label>
        Password
        <input type="password" name="password" />
      </label>
      <button type="submit">Login</button>
    </form>
  )
}
