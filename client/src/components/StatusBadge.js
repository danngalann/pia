import { Badge } from '@mantine/core';
import React from 'react';

export default function StatusBadge({ status }) {
  let color;
  switch (status) {
    case 'open':
      color = 'red';
      break;
    case 'investigating':
      color = 'yellow';
      break;
    case 'identified':
      color = 'indigo';
      break;
    case 'closed':
      color = 'green';
      break;
    default:
      color = 'dark';
      break;
  }

  return (
    <Badge
      variant="filled"
      color={color}
    >
      {status}
    </Badge>
  );
}
