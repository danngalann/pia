import React, { Suspense } from 'react';
import { Loader } from '@mantine/core';

import IncidentList from '../components/IncidentList';

export default function Incidents() {
  return (
    <Suspense fallback={<Loader />}>
      <IncidentList />
    </Suspense>
  );
}
