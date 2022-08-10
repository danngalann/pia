import { useState } from 'react';
import { Code, Modal, Select } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconX, IconCheck } from '@tabler/icons';

import { updateIncidentStatus, useIncident } from '../../api/incident';
import CenteredLoader from '../common/CenteredLoader';

export default function IncidentDetail({ incidentId, setIncidentId }) {
  const { incident, isLoading, error } = useIncident(incidentId);

  return (
    <Modal
      opened={incidentId !== null}
      onClose={() => setIncidentId(null)}
      title="Incident details"
      size="60%"
      overlayBlur={2}
      closeButtonLabel="Close incident detail modal"
    >
      {isLoading ? <CenteredLoader /> : <IncidentModalContent incident={incident} />}
    </Modal>
  );
}

function IncidentModalContent({ incident }) {
  const dateFormatted = new Date(incident.createdAt).toLocaleString();
  const [status, setStatus] = useState(incident.status);

  const updateStatus = newStatus => {
    const oldStatus = status;
    setStatus(newStatus);

    updateIncidentStatus(incident._id, newStatus)
      .then(() => {
        showNotification({
          title: 'Success',
          message: 'Status updated',
          icon: <IconCheck />,
          color: 'green',
          autoClose: 5000,
        });
      })
      .catch(err => {
        showNotification({
          title: 'Error',
          message: err.message,
          icon: <IconX />,
          color: 'red',
          autoClose: 5000,
        });
        setStatus(oldStatus);
      });
  };

  return (
    <div>
      <h1>{incident.project}</h1>
      <p>
        The error <Code>{incident.message}</Code> was first received at {dateFormatted}.
      </p>
      <Select
        label="Status"
        data={[
          { value: 'open', label: 'Open' },
          { value: 'investigating', label: 'Investigating' },
          { value: 'identified', label: 'Identified' },
          { value: 'closed', label: 'Closed' },
        ]}
        value={status}
        onChange={updateStatus}
      />
      <p>The trace was:</p>
      <Code block>{JSON.stringify(incident.trace, null, 2)}</Code>
    </div>
  );
}
