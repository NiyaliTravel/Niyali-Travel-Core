import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/Utills/supabase';

export default function AgentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert('Login failed');
    } else {
      navigate('/agent-dashboard');
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