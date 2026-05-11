import { Hotel, Attraction, Transport, ContactMessage, StatsData } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Hotels endpoints
export async function getHotels(): Promise<Hotel[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/hotels`);
    if (!response.ok) throw new Error('Failed to fetch hotels');
    return response.json();
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return [];
  }
}

export async function getHotelById(id: number): Promise<Hotel | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/hotels/${id}`);
    if (!response.ok) throw new Error('Failed to fetch hotel');
    return response.json();
  } catch (error) {
    console.error('Error fetching hotel:', error);
    return null;
  }
}

// Attractions endpoints
export async function getAttractions(): Promise<Attraction[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/attractions`);
    if (!response.ok) throw new Error('Failed to fetch attractions');
    return response.json();
  } catch (error) {
    console.error('Error fetching attractions:', error);
    return [];
  }
}

export async function getAttractionById(id: number): Promise<Attraction | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/attractions/${id}`);
    if (!response.ok) throw new Error('Failed to fetch attraction');
    return response.json();
  } catch (error) {
    console.error('Error fetching attraction:', error);
    return null;
  }
}

// Transport endpoints
export async function getTransport(): Promise<Transport[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/transport`);
    if (!response.ok) throw new Error('Failed to fetch transport');
    return response.json();
  } catch (error) {
    console.error('Error fetching transport:', error);
    return [];
  }
}

// Contact endpoint
export async function submitContact(data: ContactMessage): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.ok;
  } catch (error) {
    console.error('Error submitting contact:', error);
    return false;
  }
}

// Statistics endpoint
export async function getStats(): Promise<StatsData> {
  try {
    const response = await fetch(`${API_BASE_URL}/stats`);
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  } catch (error) {
    console.error('Error fetching stats:', error);
    return { visitors: 0, hotels: 0, attractions: 0, guides: 0 };
  }
}
