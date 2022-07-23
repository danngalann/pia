import { Loader } from '@mantine/core';
import React from 'react';
import useSWR from 'swr';
import { fetcher } from '../api/fetcher';

export default function Home() {
  const { data } = useSWR('http://localhost:5000/config/setup-required', fetcher);

  if (typeof data === 'undefined') {
    return <Loader />;
  }

  return data ? <div>Setup</div> : <div>Home</div>;
}
