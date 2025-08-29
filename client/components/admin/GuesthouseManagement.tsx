import { useState, useEffect } from 'react';
import { supabase } from '@/Utills/supabase';
import AdminTable from './AdminTable';
import Modal from './Modal';
import GuesthouseForm from './GuesthouseForm';

export default function GuesthouseManagement() {
  const [guesthouses, setGuesthouses] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGuesthouse, setCurrentGuesthouse] = useState<any | null>(null);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);

  const fetchGuesthouses = async () => {
    const { data, error } = await supabase.from('guesthouses').select('*').range(page * pageSize, (page + 1) * pageSize - 1);
    if (error) console.error('Error fetching guesthouses:', error);
    else setGuesthouses(data);
  };

  useEffect(() => {
    fetchGuesthouses();
  }, [page]);

  const handleEdit = (guesthouse: any) => {
    setCurrentGuesthouse(guesthouse);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this guesthouse?')) {
      const { error } = await supabase.from('guesthouses').delete().eq('id', id);
      if (error) alert('Error deleting guesthouse');
      else fetchGuesthouses();
    }
  };

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    setCurrentGuesthouse(null);
    fetchGuesthouses();
  };

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'location', header: 'Location' },
    { key: 'description', header: 'Description' },
    { key: 'price_range', header: 'Price Range' },
    { key: 'image_url', header: 'Image URL' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Guesthouse Management</h2>
      <button
        onClick={() => {
          setCurrentGuesthouse(null);
          setIsModalOpen(true);
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add New Guesthouse
      </button>
      <AdminTable data={guesthouses} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />
      <div className="flex justify-between mt-4">
        <button onClick={() => setPage(prev => Math.max(0, prev - 1))} disabled={page === 0} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
          Previous
        </button>
        <span>Page {page + 1}</span>
        <button onClick={() => setPage(prev => prev + 1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
          Next
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentGuesthouse ? 'Edit Guesthouse' : 'Create Guesthouse'}>
        <GuesthouseForm onSuccess={handleFormSuccess} initialData={currentGuesthouse} />
      </Modal>
    </div>
  );
}