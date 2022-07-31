import React, { Suspense } from 'react';

import IncidentList from '../components/incidents/IncidentList';
import Page from '../components/page/Page';
import CenteredLoader from '../components/common/CenteredLoader';

export default function Incidents() {
  return (
    <Page>
      <Suspense fallback={<CenteredLoader />}>
        <IncidentList />
      </Suspense>
    </Page>
  );
}
