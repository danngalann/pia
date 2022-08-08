import { Code, Modal } from '@mantine/core';
import { useIncident } from '../../api/incident';
import CenteredLoader from '../common/CenteredLoader';

export default function IncidentDetail({ incidentId, setIncidentId }) {
  const { incident, isLoading, error } = useIncident(incidentId);

  return (
    <Modal
      opened={incidentId !== null}
      onClose={() => setIncidentId(null)}
      title="Incident Details"
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

  return (
    <div>
      <h1>{incident.project}</h1>
      <p>
        The error <Code>{incident.message}</Code> was first received at {dateFormatted}.
      </p>
      <p>The trace was:</p>
      <Code block>{JSON.stringify(incident.trace, null, 2)}</Code>
    </div>
  );
}
