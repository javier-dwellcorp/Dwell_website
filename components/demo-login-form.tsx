'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, LockKeyhole } from 'lucide-react';

type DemoLoginFormProps = {
  compact?: boolean;
};

export function DemoLoginForm({ compact = false }: DemoLoginFormProps) {
  const router = useRouter();
  const [username, setUsername] = useState('atlas-demo');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/demo-session', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        setError('Enter atlas-demo to open the demonstration.');
        return;
      }

      router.push('/atlas');
      router.refresh();
    } catch {
      setError('The demonstration could not be opened. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={compact ? 'demo-login compact-login' : 'demo-login'} onSubmit={submit}>
      <div className="demo-login-heading">
        <LockKeyhole aria-hidden="true" size={19} />
        <span>Demonstration access</span>
      </div>
      <label htmlFor={compact ? 'home-demo-user' : 'atlas-demo-user'}>Client username</label>
      <div className="login-row">
        <input
          id={compact ? 'home-demo-user' : 'atlas-demo-user'}
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          autoComplete="username"
          spellCheck={false}
          aria-describedby={error ? 'demo-login-error' : undefined}
        />
        <button className="button button-dark" type="submit" disabled={loading}>
          {loading ? 'Opening…' : 'Open ATLAS'} <ArrowRight aria-hidden="true" size={17} />
        </button>
      </div>
      <p className="login-hint">No password is required for this prototype.</p>
      {error && <p className="login-error" id="demo-login-error" role="alert">{error}</p>}
    </form>
  );
}
