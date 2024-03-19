import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const DetailedProject = () => {
  const location = useLocation();
  const { state } = location;
  const project_timeline = state.projects;
  


  const downloadProjectStatus = async (projectId) => {
    try {
      const response = await axios.get(`http://localhost:8000/download-project-status/${projectId}`, {
        responseType: 'blob', // Set response type to blob to receive binary data
      });

      // Create a URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary <a> element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `project_status_${projectId}.csv`); // Set filename for download
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Cleanup
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading project status:', error);
    }
  };

  if (!project_timeline) {
    return <div>Loading category...</div>;
  }

  return (
    <div className="w-full">
      <div className="h-auto w-full grid grid-cols-1 gap-10 mt-2 px-6 ml-10">
        {project_timeline && Array.isArray(project_timeline) && project_timeline.length > 0 ? (
          project_timeline.map((project, index) => {
            const dateObj = new Date(project.date);
            return (
              <div
                className="w-4/5 px-2 py-2 h-auto shadow-sm shadow-gray-400 rounded-lg text-center flex flex-col justify-between  gap-2 hover:scale-105 duration-500 cursor-pointer "
                key={index}
              >
                <div className="flex justify-between">
                  <h2>Last Updated date: </h2>
                  <h2>{dateObj.toLocaleDateString()}</h2>
                </div>
                <div className="flex justify-between">
                  <h2>Percentage: </h2>
                  <h2>{project.percentage}</h2>
                </div>
                <div className="flex justify-between">
                  <h2>Status: </h2>
                  <h2>{project.status}</h2>
                </div>
                
              </div>
            );
          })
        ) : (
          <div>No projects found</div>
        )}
      </div>
    </div>
  );
};

export default DetailedProject;
