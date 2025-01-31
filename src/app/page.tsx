'use client';

import React from 'react';
// import PageScroller from '../components/PageScroller';
// import Project1 from '../components/Project1';
// import Project2 from '../components/Project2';
// // import Project3 from '../components/Project3';
// import BackgroundLayout from '@/components/BackgroundLayout';
// import ProjectCard from '@/components/ProjectCard';
// import { projects as projectData } from '@/config/projectData';
import { Port25 } from "@/components/Port25";

export default function Page() {
  return (
    <Port25>
      {/* Your page content here */}
      <div className="p-8 text-red-800">
        <h1>Welcome to Port25</h1>
        {/* Add more content as needed */}
      </div>
    </Port25>
    // <BackgroundLayout>
    //   <PageScroller>
    //     {/* <Project1 />
    //     <Project2 />
    //     <Project3 /> */}
    //     {projectData.map((project) => (
    //       <ProjectCard key={project.id} {...project} />
    //     ))}
    //   </PageScroller>
    // </BackgroundLayout>
  );
}