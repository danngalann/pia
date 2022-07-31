import React, { Suspense } from 'react';
import { Loader } from '@mantine/core';

import IncidentList from '../components/IncidentList';
import Page from '../components/Page';

export default function Incidents() {
  return (
    <Page>
      <Suspense fallback={<Loader />}>
        <IncidentList />
      </Suspense>
    </Page>
  );
}
