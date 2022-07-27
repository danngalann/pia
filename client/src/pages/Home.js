import { Loader } from '@mantine/core';
import React from 'react';
import useSWR from 'swr';
import { fetcher } from '../api/fetcher';
import Setup from '../components/Setup';

export default function Home() {
  const { data } = useSWR('http://localhost:5000/config/setup-required', fetcher);

  if (typeof data === 'undefined') {
    return <Loader />;
  }

  return data ? <Setup /> : <div>Home</div>;
}
