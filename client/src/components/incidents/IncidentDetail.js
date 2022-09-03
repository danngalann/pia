import { forwardRef, useState } from 'react';
import {
  Code,
  ColorSwatch,
  Grid,
  Group,
  Modal,
  ScrollArea,
  Select,
  Text,
  Timeline,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconX, IconCheck, IconNotebook } from '@tabler/icons';
import { JSONTree } from 'react-json-tree';

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
  const { colorScheme } = useMantineColorScheme();

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

  const jsonTheme = {
    scheme: 'monokai',
    author: 'wimer hazenberg (http://www.monokai.nl)',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#cc6633',
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
        <JSONTree
          data={incident.trace}
          theme={jsonTheme}
          invertTheme={colorScheme !== 'dark'}
        />
      </Grid.Col>
    </Grid>
  );
}
