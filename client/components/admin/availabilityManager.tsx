import { useState, useEffect } from 'react';
import { supabase } from '@/Utills/supabase';
import { Calendar } from '../ui/calendar';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from '../../hooks/use-toast';

interface Guesthouse {
  id: string;
  name: string;
}

interface Availability {
  id: string;
  guesthouseid: string;
  date: string;
  isavailable: boolean;
}

export default function AvailabilityManager() {
  const [guesthouses, setGuesthouses] = useState<Guesthouse[]>([]);
  const [selectedGuesthouse, setSelectedGuesthouse] = useState<string>('');
  const [availabilityData, setAvailabilityData] = useState<Availability[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    fetchGuesthouses();
  }, []);

  useEffect(() => {
    if (selectedGuesthouse) {
      fetchAvailability(selectedGuesthouse);
    }
  }, [selectedGuesthouse]);

  const fetchGuesthouses = async () => {
    const { data, error } = await supabase.from('guesthouses').select('id, name');
    if (error) {
      toast({
        title: "Error fetching guesthouses",
        description: error.message,
        variant: "destructive",
      });
    } else if (data) {
      setGuesthouses(data);
    }
  };

  const fetchAvailability = async (guesthouseId: string) => {
    const { data, error } = await supabase
      .from('availability')
      .select('*')
      .eq('guesthouseid', guesthouseId)
      .order('date', { ascending: true });

    if (error) {
      toast({
        title: "Error fetching availability",
        description: error.message,
        variant: "destructive",
      });
    } else if (data) {
      setAvailabilityData(data);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const toggleAvailability = async () => {
    if (!selectedGuesthouse || !selectedDate) {
      toast({
        title: "Selection missing",
        description: "Please select a guesthouse and a date.",
        variant: "destructive",
      });
      return;
    }

    const dateString = selectedDate.toISOString().split('T')[0];
    const existingAvailability = availabilityData.find(
      (item) => item.date === dateString && item.guesthouseid === selectedGuesthouse
    );

    if (existingAvailability) {
      // Update existing availability
      const { error } = await supabase
        .from('availability')
        .update({ isavailable: !existingAvailability.isavailable })
        .eq('id', existingAvailability.id);

      if (error) {
        toast({
          title: "Error updating availability",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Availability updated",
          description: `Availability for ${dateString} changed to ${!existingAvailability.isavailable}.`,
        });
        fetchAvailability(selectedGuesthouse); // Refresh data
      }
    } else {
      // Insert new availability
      const { error } = await supabase.from('availability').insert([
        {
          guesthouseid: selectedGuesthouse,
          date: dateString,
          isavailable: true, // Default to available when creating
        },
      ]);

      if (error) {
        toast({
          title: "Error creating availability",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Availability created",
          description: `Availability for ${dateString} set to true.`,
        });
        fetchAvailability(selectedGuesthouse); // Refresh data
      }
    }
  };

  const getDayClassNames = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    const availability = availabilityData.find(
      (item) => item.date === dateString && item.guesthouseid === selectedGuesthouse
    );

    if (availability) {
      return availability.isavailable ? 'bg-green-200' : 'bg-red-200';
    }
    return '';
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Guesthouse Availability</h2>

      <div className="mb-4">
        <label htmlFor="guesthouse-select" className="block text-sm font-medium text-gray-700">Select Guesthouse</label>
        <Select onValueChange={setSelectedGuesthouse} value={selectedGuesthouse}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a guesthouse" />
          </SelectTrigger>
          <SelectContent>
            {guesthouses.map((guesthouse) => (
              <SelectItem key={guesthouse.id} value={guesthouse.id}>
                {guesthouse.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedGuesthouse && (
        <div className="flex gap-4">
          <div className="w-1/2">
            <h3 className="text-xl font-semibold mb-2">Select Date</h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border"
              dayClassNames={getDayClassNames}
            />
            <Button onClick={toggleAvailability} className="mt-4">
              Toggle Availability for Selected Date
            </Button>
          </div>

          <div className="w-1/2">
            <h3 className="text-xl font-semibold mb-2">Availability Overview</h3>
            <div className="border rounded-md p-2 h-[400px] overflow-y-auto">
              {availabilityData.length === 0 ? (
                <p>No availability data for this guesthouse.</p>
              ) : (
                <ul>
                  {availabilityData.map((item) => (
                    <li key={item.id} className="flex justify-between items-center py-1">
                      <span>{item.date}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.isavailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {item.isavailable ? 'Available' : 'Not Available'}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}