import React, { Suspense } from 'react';

import IncidentList from '../components/incidents/IncidentList';
import Page from '../components/page/Page';
import CenteredLoader from '../components/common/CenteredLoader';
import { ErrorBoundary } from '../components/common/ErrorBoundary';

export default function Incidents() {
  return (
    <Page>
      <ErrorBoundary fallback={<h2>Could not fetch incidents.</h2>}>
        <Suspense fallback={<CenteredLoader />}>
          <IncidentList />
        </Suspense>
      </ErrorBoundary>
    </Page>
  );
}
