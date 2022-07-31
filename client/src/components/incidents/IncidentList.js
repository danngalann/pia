import { Table } from '@mantine/core';
import React from 'react';
import { useIncidents } from '../../api/incident';
import StatusBadge from '../common/StatusBadge';
import CenteredLoader from '../common/CenteredLoader';

function Incident({ data }) {
  const dateFormatted = new Date(data.createdAt).toLocaleString();

  return (
    <tr>
      <td>{data.project}</td>
      <td>{dateFormatted}</td>
      <td>
        <StatusBadge status={data.status} />
      </td>
    </tr>
  );
}

function IncidentList() {
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
    <Table>
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
          />
        ))}
      </tbody>
    </Table>
  );
}

IncidentList.Incident = Incident;

export default IncidentList;
