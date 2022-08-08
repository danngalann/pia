import useSWR from 'swr';

import { fetcher } from '../api/fetcher';

export function useIncidents() {
  const { data, error } = useSWR('http://localhost:5000/incidents', fetcher);

  return {
    incidents: data,
    isLoading: !error && !data,
    error,
  };
}

export function useIncident(id) {
  const { data, error } = useSWR(id ? `http://localhost:5000/incidents/${id}` : null, fetcher);

  return {
    incident: data,
    isLoading: !error && !data,
    error,
  };
}
