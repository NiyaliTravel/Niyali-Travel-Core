import { useState, useEffect } from 'react';
import { supabase } from '../../Utills/supabaseClient';

export default function ContactInfoForm() {
  const [info, setInfo] = useState({ phone: '', email: '', address: '', mapembed: '' });

  useEffect(() => {
    supabase.from('contact_info').select('*').single().then(({ data }) => {
      if (data) setInfo(data);
    });
  }, []);

  const handleUpdate = async () => {
    const { error } = await supabase.from('contact_info').update(info).eq('id', 1); // Assuming a single contact info entry with ID 1
    if (error) alert('Update failed');
    else alert('Contact info updated');
  };

  return (
    <div>
      <h3>Update Contact Info</h3>
      <input placeholder="Phone" value={info.phone} onChange={e => setInfo({ ...info, phone: e.target.value })} />
      <input placeholder="Email" value={info.email} onChange={e => setInfo({ ...info, email: e.target.value })} />
      <input placeholder="Address" value={info.address} onChange={e => setInfo({ ...info, address: e.target.value })} />
      <input placeholder="Map Embed" value={info.mapembed} onChange={e => setInfo({ ...info, mapembed: e.target.value })} />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}