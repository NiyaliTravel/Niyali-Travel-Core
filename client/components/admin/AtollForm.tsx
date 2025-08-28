import { useState } from 'react';
import { supabase } from '../../Utills/supabaseClient';

export default function AtollForm({ onSuccess, initialData }: { onSuccess: () => void; initialData?: any }) {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');

  const handleSubmit = async () => {
    if (initialData) {
      const { error } = await supabase.from('atolls').update({ name, description, image_url: imageUrl }).eq('id', initialData.id);
      if (error) alert('Error updating atoll');
      else onSuccess();
    } else {
      const { error } = await supabase.from('atolls').insert([{ name, description, image_url: imageUrl }]);
      if (error) alert('Error creating atoll');
      else onSuccess();
    }
  };

  return (
    <div>
      <h3>Create Atoll</h3>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <textarea placeholder="Description" onChange={e => setDescription(e.target.value)} />
      <input placeholder="Image URL" onChange={e => setImageUrl(e.target.value)} />
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
}