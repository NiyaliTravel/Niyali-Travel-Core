import { useState, useEffect } from 'react';
import { supabase } from '@/Utills/supabase';
import AdminTable from './AdminTable';
import Modal from './Modal';
import AtollForm from './AtollForm';

export default function AtollManagement() {
  const [atolls, setAtolls] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAtoll, setCurrentAtoll] = useState<any | null>(null);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);

  const fetchAtolls = async () => {
    const { data, error } = await supabase.from('atolls').select('*').range(page * pageSize, (page + 1) * pageSize - 1);
    if (error) console.error('Error fetching atolls:', error);
    else setAtolls(data);
  };

  useEffect(() => {
    fetchAtolls();
  }, [page]);

  const handleEdit = (atoll: any) => {
    setCurrentAtoll(atoll);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this atoll?')) {
      const { error } = await supabase.from('atolls').delete().eq('id', id);
      if (error) alert('Error deleting atoll');
      else fetchAtolls();
    }
  };

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    setCurrentAtoll(null);
    fetchAtolls();
  };

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'description', header: 'Description' },
    { key: 'image_url', header: 'Image URL' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Atoll Management</h2>
      <button
        onClick={() => {
          setCurrentAtoll(null);
          setIsModalOpen(true);
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add New Atoll
      </button>
      <AdminTable data={atolls} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />
      <div className="flex justify-between mt-4">
        <button onClick={() => setPage(prev => Math.max(0, prev - 1))} disabled={page === 0} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
          Previous
        </button>
        <span>Page {page + 1}</span>
        <button onClick={() => setPage(prev => prev + 1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
          Next
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentAtoll ? 'Edit Atoll' : 'Create Atoll'}>
        <AtollForm onSuccess={handleFormSuccess} initialData={currentAtoll} />
      </Modal>
    </div>
  );
}