import { useState, useEffect } from 'react';
import { supabase } from '../Utills/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Button } from '../components/ui/button';
import { format } from 'date-fns';
import { cn } from '../lib/utils';
import { CalendarIcon } from 'lucide-react';

interface Guesthouse {
  id: string;
  name: string;
}

interface Availability {
  date: string;
  isavailable: boolean;
  guesthouseid: string;
}

export default function BookingPage() {
  const [guesthouses, setGuesthouses] = useState<Guesthouse[]>([]);
  const [selectedGuesthouse, setSelectedGuesthouse] = useState<string>('');
  const [checkin, setCheckin] = useState<Date | undefined>(undefined);
  const [checkout, setCheckout] = useState<Date | undefined>(undefined);
  const [available, setAvailable] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  // Fetch guesthouses on mount
  useEffect(() => {
    supabase.from('guesthouses').select('id, name').then(({ data }: { data: Guesthouse[] | null }) => {
      if (data) setGuesthouses(data);
    });

    // Get current user ID
    supabase.auth.getUser().then(({ data }: { data: { user: { id: string } | null } | null }) => {
      if (data?.user?.id) setUserId(data.user.id);
    });
  }, []);

  // Check availability
  const checkAvailability = async () => {
    if (!selectedGuesthouse || !checkin || !checkout) return;

    const dates = [];
    for (let d = new Date(checkin); d <= checkout; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d).toISOString().split('T')[0]);
    }

    const { data, error } = await supabase
      .from('availability')
      .select('date, isavailable')
      .in('date', dates)
      .eq('guesthouseid', selectedGuesthouse) as { data: Availability[] | null, error: any };

    if (error) {
      setStatus('Error checking availability');
      return;
    }

    const allAvailable = data?.every((d: Availability) => d.isavailable);
    setAvailable(allAvailable || false);
    setStatus(allAvailable ? 'Available!' : 'Not available for selected dates');
  };

  // Submit booking
  const submitBooking = async () => {
    if (!checkin || !checkout) return;
    const bookingId = uuidv4();
    const { error } = await supabase.from('bookings').insert([{
      id: bookingId,
      guesthouseid: selectedGuesthouse,
      userid: userId,
      checkin: checkin.toISOString().split('T')[0],
      checkout: checkout.toISOString().split('T')[0],
      status: 'pending',
      created_at: new Date().toISOString()
    }]);

    if (error) {
      setStatus('Booking failed');
    } else {
      setStatus('Booking submitted!');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Book a Guesthouse</h2>

      <label htmlFor="guesthouse-select" className="sr-only">Select Guesthouse</label>
      <select id="guesthouse-select" onChange={e => setSelectedGuesthouse(e.target.value)} value={selectedGuesthouse} aria-label="Select Guesthouse">
        <option value="">Select Guesthouse</option>
        {guesthouses.map((g: Guesthouse) => (
          <option key={g.id} value={g.id}>{g.name}</option>
        ))}
      </select>

      <div className="flex gap-4 my-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !checkin && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {checkin ? format(checkin, "PPP") : <span>Pick check-in date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={checkin}
              onSelect={setCheckin}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !checkout && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {checkout ? format(checkout, "PPP") : <span>Pick check-out date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={checkout}
              onSelect={setCheckout}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <button onClick={checkAvailability}>Check Availability</button>

      {available && <button onClick={submitBooking}>Confirm Booking</button>}
      <p>{status}</p>
    </div>
  );
}