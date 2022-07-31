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
