import IncidentList from '../components/incidents/IncidentList';
import Page from '../components/page/Page';
import { useState } from 'react';
import IncidentDetail from '../components/incidents/IncidentDetail';

export default function Incidents() {
  const [incidentId, setIncidentId] = useState(null);

  return (
    <Page>
      <IncidentList setIncidentId={setIncidentId} />
      <IncidentDetail
        incidentId={incidentId}
        setIncidentId={setIncidentId}
      />
    </Page>
  );
}
