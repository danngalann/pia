import IncidentList from '../components/incidents/IncidentList';
import Page from '../components/page/Page';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IncidentDetail from '../components/incidents/IncidentDetail';
import { useIncidents } from '../api/incident';
import CenteredLoader from '../components/common/CenteredLoader';

export default function Incidents() {
  const { incidents, isLoading, error } = useIncidents();
  const [incidentId, setIncidentId] = useState(null);
  const [incidentList, setIncidentList] = useState([]);
  const navigate = useNavigate();

  const updateIncident = newIncident => {
    setIncidentList(prev => {
      return prev.map(incident => {
        if (incident._id === newIncident._id) {
          return { ...incident, status: newIncident.status };
        }

        return incident;
      });
    });
  };

  useEffect(() => {
    if (!isLoading) {
      setIncidentList(incidents);
    }
  }, [incidents, isLoading]);

  if (error) {
    // Access token expired, wait for it to be refreshed
    if (error.name === 'AxiosError' && error.response.status === 403) {
      return <CenteredLoader />;
    }

    // Not authenticated
    if (error.name === 'AxiosError' && error.response.status === 401) {
      navigate('/login');
    }

    return <div>{error.message}</div>;
  }

  return (
    <Page>
      <IncidentList
        setIncidentId={setIncidentId}
        incidents={incidentList}
        isLoading={isLoading}
      />
      <IncidentDetail
        incidentId={incidentId}
        setIncidentId={setIncidentId}
        updateIncident={updateIncident}
      />
    </Page>
  );
}
