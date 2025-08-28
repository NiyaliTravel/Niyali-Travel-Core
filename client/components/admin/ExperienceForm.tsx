import { useState } from 'react';
import { supabase } from '../../Utills/supabaseClient';

export default function ExperienceForm({ onSuccess, initialData }: { onSuccess: () => void; initialData?: any }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');
  const [category, setCategory] = useState(initialData?.category || '');

  const handleSubmit = async () => {
    if (initialData) {
      const { error } = await supabase.from('experiences').update({ title, description, image_url: imageUrl, category }).eq('id', initialData.id);
      if (error) alert('Error updating experience');
      else onSuccess();
    } else {
      const { error } = await supabase.from('experiences').insert([{ title, description, image_url: imageUrl, category }]);
      if (error) alert('Error creating experience');
      else onSuccess();
    }
  };

  return (
    <div>
      <h3>Create Experience</h3>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Description" onChange={e => setDescription(e.target.value)} />
      <input placeholder="Image URL" onChange={e => setImageUrl(e.target.value)} />
      <input placeholder="Category" onChange={e => setCategory(e.target.value)} />
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
}