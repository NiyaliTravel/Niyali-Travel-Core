import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/Utills/supabase';

export default function AgentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert('Login failed');
    } else {
      router.push('/agent-dashboard');
    }
  };

  return (
    <div>
      <h2>Agent Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}