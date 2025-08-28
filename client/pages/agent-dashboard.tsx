import { useEffect, useState } from 'react';
import { supabase } from '../Utills/supabase.ts';
import { Booking } from '../types'; // Assuming Booking interface is in client/types/index.ts

export default function AgentDashboard() {
    const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data, error } = await supabase.from('bookings').select('*');
      if (error) console.error(error);
      else setBookings(data);
    };
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>
      <ul>
        {bookings.map(b => (
          <li key={b.id}>{b.guestHouseId} — {b.status}</li>
        ))}
      </ul>
    </div>
  );
}