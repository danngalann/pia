import { Table } from '@mantine/core';
import React from 'react';
import useSWR from 'swr';

import { fetcher } from '../../api/fetcher';
import StatusBadge from '../StatusBadge';

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
  const { data } = useSWR('http://localhost:5000/incidents', fetcher, { suspense: true });

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
        {data.map(incident => (
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
