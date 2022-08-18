import { Table } from '@mantine/core';
import StatusBadge from '../common/StatusBadge';
import { useNavigate } from 'react-router-dom';

import CenteredLoader from '../common/CenteredLoader';
import { useIncidents } from '../../api/incident';

function Incident({ data, setIncidentId }) {
  const dateFormatted = new Date(data.updatedAt).toLocaleString();

  return (
    <tr
      onClick={() => setIncidentId(data._id)}
      style={{ cursor: 'pointer' }}
    >
      <td>{data.project}</td>
      <td>{dateFormatted}</td>
      <td>
        <StatusBadge status={data.status} />
      </td>
      <td>{data.ocurred_at.length}</td>
    </tr>
  );
}

function IncidentList({ setIncidentId }) {
  const navigate = useNavigate();
  const { incidents, isLoading, error } = useIncidents();

  if (isLoading) {
    return <CenteredLoader />;
  }

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
    <Table highlightOnHover>
      <thead>
        <tr>
          <th>Project</th>
          <th>Last update</th>
          <th>Status</th>
          <th>Times occurred</th>
        </tr>
      </thead>
      <tbody>
        {incidents.map(incident => (
          <Incident
            key={incident._id}
            data={incident}
            setIncidentId={setIncidentId}
          />
        ))}
      </tbody>
    </Table>
  );
}

IncidentList.Incident = Incident;

export default IncidentList;
