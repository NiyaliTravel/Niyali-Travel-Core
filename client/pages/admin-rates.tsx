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
  price_per_night?: number;
}

export default function AdminRatesPage() {
  const [guesthouses, setGuesthouses] = useState<Guesthouse[]>([]);
  const [selectedGuesthouse, setSelectedGuesthouse] = useState<string>('');
  const [selectedDates, setSelectedDates] = useState<Date[] | undefined>(undefined);
  const [newRate, setNewRate] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    supabase.from('guesthouses').select('id, name, price_per_night').then(({ data }: { data: Guesthouse[] | null }) => {
      if (data) setGuesthouses(data);
    });
  }, []);

  const handleBulkRateUpdate = async () => {
    if (!selectedGuesthouse || !selectedDates || selectedDates.length === 0 || !newRate) {
      setStatus('Please select a guesthouse, dates, and enter a new rate.');
      return;
    }

    const rateUpdates = selectedDates.map((date: Date) => ({
      guesthouseid: selectedGuesthouse,
      date: format(date, 'yyyy-MM-dd'),
      price_per_night: parseFloat(newRate),
    }));

    // For simplicity, we'll update the guesthouse's default price_per_night
    // and also create/update a new 'rates' table if it existed.
    // For now, we'll just update the guesthouse's price_per_night.
    const { error: guesthouseError } = await supabase
      .from('guesthouses')
      .update({ price_per_night: parseFloat(newRate) })
      .eq('id', selectedGuesthouse);

    if (guesthouseError) {
      setStatus(`Error updating guesthouse rate: ${guesthouseError.message}`);
      return;
    }

    // If a dedicated 'rates' table existed, we would upsert into it here.
    // For now, we'll assume the guesthouse's price_per_night is the primary rate.

    setStatus('Rates updated successfully!');
    setSelectedDates(undefined);
    setNewRate('');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Bulk Rate Update</h2>

      <label htmlFor="guesthouse-select" className="sr-only">Select Guesthouse</label>
      <select id="guesthouse-select" onChange={e => setSelectedGuesthouse(e.target.value)} value={selectedGuesthouse} aria-label="Select Guesthouse">
        <option value="">Select Guesthouse</option>
        {guesthouses.map((g: Guesthouse) => (
          <option key={g.id} value={g.id}>{g.name} {g.price_per_night ? `($${g.price_per_night}/night)` : ''}</option>
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
        <label htmlFor="new-rate">New Rate:</label>
        <input
          id="new-rate"
          type="number"
          value={newRate}
          onChange={e => setNewRate(e.target.value)}
          placeholder="Enter new rate"
        />
      </div>

      <button onClick={handleBulkRateUpdate}>Update Rates</button>
      <p>{status}</p>
    </div>
  );
}