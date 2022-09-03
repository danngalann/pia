import { Table } from '@mantine/core';
import StatusBadge from '../common/StatusBadge';

import CenteredLoader from '../common/CenteredLoader';

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

function IncidentList({ setIncidentId, incidents, isLoading }) {
  if (isLoading) {
    return <CenteredLoader />;
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
