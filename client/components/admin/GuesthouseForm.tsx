import { useState } from 'react';
import { supabase } from '../../Utills/supabaseClient';

export default function GuesthouseForm({ onSuccess, initialData }: { onSuccess: () => void; initialData?: any }) {
  const [name, setName] = useState(initialData?.name || '');
  const [location, setLocation] = useState(initialData?.location || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [priceRange, setPriceRange] = useState(initialData?.price_range || '');
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');

  const handleSubmit = async () => {
    if (initialData) {
      const { error } = await supabase.from('guesthouses').update({ name, location, description, price_range: priceRange, image_url: imageUrl }).eq('id', initialData.id);
      if (error) alert('Error updating guesthouse');
      else onSuccess();
    } else {
      const { error } = await supabase.from('guesthouses').insert([{
        name, location, description, price_range: priceRange, image_url: imageUrl
      }]);
      if (error) alert('Error creating guesthouse');
      else onSuccess();
    }
  };

  return (
    <div>
      <h3>Create Guesthouse</h3>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Location" onChange={e => setLocation(e.target.value)} />
      <textarea placeholder="Description" onChange={e => setDescription(e.target.value)} />
      <input placeholder="Price Range" onChange={e => setPriceRange(e.target.value)} />
      <input placeholder="Image URL" onChange={e => setImageUrl(e.target.value)} />
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
}