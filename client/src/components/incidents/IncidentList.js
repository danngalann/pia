import { ActionIcon, Table } from '@mantine/core';
import StatusBadge from '../common/StatusBadge';
import { IconEye } from '@tabler/icons';

import CenteredLoader from '../common/CenteredLoader';
import { useIncidents } from '../../api/incident';

function Incident({ data, setIncidentId }) {
  const dateFormatted = new Date(data.createdAt).toLocaleString();

  return (
    <tr>
      <td>{data.project}</td>
      <td>{dateFormatted}</td>
      <td>
        <StatusBadge status={data.status} />
      </td>
      <td>
        <ActionIcon
          onClick={() => setIncidentId(data._id)}
          title="Details"
        >
          <IconEye />
        </ActionIcon>
        {/* <Button>Details</Button> */}
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
          <th>Actions</th>
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
