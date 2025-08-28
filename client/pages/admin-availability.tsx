import { useState, useEffect } from 'react';
import { supabase } from '../Utills/supabaseClient';
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

export default function AdminAvailabilityPage() {
  const [guesthouses, setGuesthouses] = useState<Guesthouse[]>([]);
  const [selectedGuesthouse, setSelectedGuesthouse] = useState<string>('');
  const [selectedDates, setSelectedDates] = useState<Date[] | undefined>(undefined);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    supabase.from('guesthouses').select('id, name').then(({ data }: { data: Guesthouse[] | null }) => {
      if (data) setGuesthouses(data);
    });
  }, []);

  const handleBulkUpdate = async () => {
    if (!selectedGuesthouse || !selectedDates || selectedDates.length === 0) {
      setStatus('Please select a guesthouse and at least one date.');
      return;
    }

    const availabilityData = selectedDates.map((date: Date) => ({
      guesthouseid: selectedGuesthouse,
      date: format(date, 'yyyy-MM-dd'),
      isavailable: isAvailable,
    }));

    const { error } = await supabase.from('availability').upsert(availabilityData, { onConflict: 'guesthouseid, date' });

    if (error) {
      setStatus(`Error updating availability: ${error.message}`);
    } else {
      setStatus('Availability updated successfully!');
      setSelectedDates(undefined);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Bulk Availability Update</h2>

      <label htmlFor="guesthouse-select" className="sr-only">Select Guesthouse</label>
      <select id="guesthouse-select" onChange={e => setSelectedGuesthouse(e.target.value)} value={selectedGuesthouse} aria-label="Select Guesthouse">
        <option value="">Select Guesthouse</option>
        {guesthouses.map((g: Guesthouse) => (
          <option key={g.id} value={g.id}>{g.name}</option>
        ))}
      </select>

      <div className="my-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !selectedDates && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDates && selectedDates.length > 0 ?
                `${format(selectedDates[0], "PPP")} - ${format(selectedDates[selectedDates.length - 1], "PPP")}`
                : <span>Pick dates</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="multiple"
              selected={selectedDates}
              onSelect={setSelectedDates}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="my-4">
        <label>
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={e => setIsAvailable(e.target.checked)}
          />
          Set as Available
        </label>
      </div>

      <button onClick={handleBulkUpdate}>Update Availability</button>
      <p>{status}</p>
    </div>
  );
}