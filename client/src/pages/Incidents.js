import React, { Suspense } from 'react';
import { Loader } from '@mantine/core';

import IncidentList from '../components/incidents/IncidentList';
import Page from '../components/page/Page';

export default function Incidents() {
  return (
    <Page>
      <Suspense fallback={<Loader />}>
        <IncidentList />
      </Suspense>
    </Page>
  );
}
