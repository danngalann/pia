import useSWR from 'swr';
import axios from 'axios';

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

export function updateIncidentStatus(incidentId, newStatus) {
  return axios.patch(
    `http://localhost:5000/incidents/${incidentId}/update/status`,
    { status: newStatus },
    { withCredentials: true }
  );
}
