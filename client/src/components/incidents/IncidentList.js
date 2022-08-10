import { Table } from '@mantine/core';
import StatusBadge from '../common/StatusBadge';

import CenteredLoader from '../common/CenteredLoader';
import { useIncidents } from '../../api/incident';

function Incident({ data, setIncidentId }) {
  const dateFormatted = new Date(data.createdAt).toLocaleString();

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
    </tr>
  );
}

function IncidentList({ setIncidentId }) {
  const { incidents, isLoading, error } = useIncidents();

  if (isLoading) {
    return <CenteredLoader />;
  }

  if (error) {
    if (error.name === 'AxiosError' && error.response.status === 403) {
      return <CenteredLoader />;
    }

    return <div>{error.message}</div>;
  }

  return (
    <Table highlightOnHover>
      <thead>
        <tr>
          <th>Project</th>
          <th>Detected on</th>
          <th>Status</th>
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
