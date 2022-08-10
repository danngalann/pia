import { AppShell } from '@mantine/core';
import React from 'react';
import Header from '../appshell/Header';

export default function Page({ children }) {
  return <AppShell header={<Header />}>{children}</AppShell>;
}
