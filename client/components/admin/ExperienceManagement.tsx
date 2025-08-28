import { useState, useEffect } from 'react';
import { supabase } from '../../Utills/supabaseClient';
import AdminTable from './AdminTable';
import Modal from './Modal';
import ExperienceForm from './ExperienceForm';

export default function ExperienceManagement() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExperience, setCurrentExperience] = useState<any | null>(null);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);

  const fetchExperiences = async () => {
    const { data, error } = await supabase.from('experiences').select('*').range(page * pageSize, (page + 1) * pageSize - 1);
    if (error) console.error('Error fetching experiences:', error);
    else setExperiences(data);
  };

  useEffect(() => {
    fetchExperiences();
  }, [page]);

  const handleEdit = (experience: any) => {
    setCurrentExperience(experience);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      const { error } = await supabase.from('experiences').delete().eq('id', id);
      if (error) alert('Error deleting experience');
      else fetchExperiences();
    }
  };

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    setCurrentExperience(null);
    fetchExperiences();
  };

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'title', header: 'Title' },
    { key: 'description', header: 'Description' },
    { key: 'image_url', header: 'Image URL' },
    { key: 'category', header: 'Category' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Experience Management</h2>
      <button
        onClick={() => {
          setCurrentExperience(null);
          setIsModalOpen(true);
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add New Experience
      </button>
      <AdminTable data={experiences} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />
      <div className="flex justify-between mt-4">
        <button onClick={() => setPage(prev => Math.max(0, prev - 1))} disabled={page === 0} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
          Previous
        </button>
        <span>Page {page + 1}</span>
        <button onClick={() => setPage(prev => prev + 1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
          Next
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentExperience ? 'Edit Experience' : 'Create Experience'}>
        <ExperienceForm onSuccess={handleFormSuccess} initialData={currentExperience} />
      </Modal>
    </div>
  );
}