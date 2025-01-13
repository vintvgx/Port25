'use client';

import React from 'react';
import PageScroller from '../components/PageScroller';
import Project1 from '../components/Project1';
import Project2 from '../components/Project2';
import Project3 from '../components/Project3';
import BackgroundLayout from '@/components/BackgroundLayout';

export default function Home() {
  return (
    <BackgroundLayout>
      <PageScroller>
        <Project1 />
        <Project2 />
        <Project3 />
      </PageScroller>
    </BackgroundLayout>
  );
}