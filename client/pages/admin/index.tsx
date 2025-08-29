import { useEffect, useState } from 'react';
import { supabase } from '@/Utills/supabase';
import AvailabilityManager from '../../components/admin/availabilityManager';

export default function AdminDashboard() {
  const [user, setUser] = useState<any | null>(null);
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user: fetchedUser } } = await supabase.auth.getUser();
      setUser(fetchedUser);

      if (fetchedUser) {
        const { data } = await supabase.from('users').select('role').eq('id', fetchedUser.id).single();
        setRole(data?.role);
      }
    };
    fetchUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {role}</h2>
      {role === 'admin' && <AdminControls />}
      {role === 'editor' && <EditorControls />}
      {role === 'viewer' && <ViewerControls />}
    </div>
  );
}

function AdminControls() {
  return (
    <div>
      <h3>Admin Controls</h3>
      <p>Full CRUD access to all modules</p>
      <AvailabilityManager />
    </div>
  );
}
function EditorControls() {
  return <div>Update access only</div>;
}
function ViewerControls() {
  return <div>Read-only access</div>;
}