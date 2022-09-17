import IncidentList from '../components/incidents/IncidentList';
import Page from '../components/page/Page';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IncidentDetail from '../components/incidents/IncidentDetail';
import { useIncidents } from '../api/incident';
import CenteredLoader from '../components/common/CenteredLoader';

export default function Incidents() {
  const { id } = useParams();
  const { incidents, isLoading, error } = useIncidents();
  const [incidentId, setIncidentId] = useState(id ?? null);
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

  const updateIncidentId = id => {
    setIncidentId(id);

    if (id) {
      navigate(`/incidents/${id}`);
    } else {
      navigate('/incidents');
    }
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
        setIncidentId={updateIncidentId}
        incidents={incidentList}
        isLoading={isLoading}
      />
      <IncidentDetail
        incidentId={incidentId}
        setIncidentId={updateIncidentId}
        updateIncident={updateIncident}
      />
    </Page>
  );
}
