import { forwardRef, useState } from 'react';
import { Code, ColorSwatch, Grid, Group, List, Modal, ScrollArea, Select, Text, Timeline, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconX, IconCheck, IconNotebook } from '@tabler/icons';

import { updateIncidentStatus, useIncident } from '../../api/incident';
import CenteredLoader from '../common/CenteredLoader';

export default function IncidentDetail({ incidentId, setIncidentId }) {
  const { incident, isLoading, error } = useIncident(incidentId);

  return (
    <Modal
      opened={incidentId !== null}
      onClose={() => setIncidentId(null)}
      size="60%"
      overlayBlur={2}
      closeButtonLabel="Close incident detail modal"
    >
      {isLoading ? <CenteredLoader /> : <IncidentModalContent incident={incident} />}
    </Modal>
  );
}

const StatusSelectItem = forwardRef(({ label, description, color, ...others }, ref) => {
  return (
    <div
      ref={ref}
      {...others}
    >
      <Group>
        <ColorSwatch
          color={color}
          size={10}
        />
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs">{description}</Text>
        </div>
      </Group>
    </div>
  );
});

function IncidentModalContent({ incident }) {
  const dateFormatted = new Date(incident.ocurred_at[0]).toLocaleString();
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
    <Grid>
      <Grid.Col md={6}>
        <Title order={1}>{incident.project}</Title>
      </Grid.Col>
      <Grid.Col md={6}>
        <Title
          order={3}
          style={{ marginBottom: 10 }}
        >
          Status
        </Title>
        <Select
          aria-label="Status"
          data={[
            { value: 'open', label: 'Open', color: 'red', description: 'No one is looking at it yet' },
            {
              value: 'investigating',
              label: 'Investigating',
              color: 'yellow',
              description: 'Someone is taking a look',
            },
            { value: 'identified', label: 'Identified', color: 'indigo', description: 'Bug located but not resolved' },
            { value: 'closed', label: 'Closed', color: 'green', description: 'Issue resolved' },
          ]}
          value={status}
          onChange={updateStatus}
          itemComponent={StatusSelectItem}
        />
      </Grid.Col>
      <Grid.Col md={6}>
        <Title
          order={3}
          style={{ marginBottom: 10 }}
        >
          Details
        </Title>

        <ScrollArea
          style={{ height: 150, width: '100%' }}
          type="auto"
          offsetScrollbars
        >
          <Text>The error was first received at {dateFormatted}.</Text>
          <Text>The message was:</Text>
          <Code block>{incident.message}</Code>
        </ScrollArea>
      </Grid.Col>
      <Grid.Col md={6}>
        <Title
          order={3}
          style={{ marginBottom: 10 }}
        >
          Timeline
        </Title>
        <ScrollArea
          style={{ height: 150, width: '100%' }}
          type="auto"
          offsetScrollbars
        >
          <Timeline>
            {incident.ocurred_at.map((date, index) => {
              const dateFormatted = new Date(date).toLocaleString();
              return (
                <Timeline.Item
                  key={index}
                  title="Incident received"
                  bullet={<IconNotebook size={12} />}
                >
                  {index === 0 ? (
                    <Text
                      size="sm"
                      color="dimmed"
                    >
                      Incident was first logged at {dateFormatted}
                    </Text>
                  ) : (
                    <Text
                      size="sm"
                      color="dimmed"
                    >
                      Incident was logged again at {dateFormatted}
                    </Text>
                  )}
                </Timeline.Item>
              );
            })}
          </Timeline>
        </ScrollArea>
      </Grid.Col>
      <Grid.Col span={12}>
        <p>The trace was:</p>
        <Code block>{JSON.stringify(incident.trace, null, 2)}</Code>
      </Grid.Col>
    </Grid>
  );
}
