// This file will contain shared schema definitions.
export interface DomesticAirline {
  id: string;
  name: string;
  code: string;
  fromLocation: string;
  toLocation: string;
  airlineName: string;
  aircraftType: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
  bookingUrl: string;
}