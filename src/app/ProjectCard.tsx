"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { type Project } from './types/GitLab';

const ProjectCard = ({ project }: { project: Project }) => {
    return (
      <div className="project-card">
        <h3>{project.name}</h3>
        {project.description ? (
          <p>{project.description}</p>
        ) : (
          <p>Pas de description disponible</p>
        )}
        {project.isMigrated && project.githubUrl ? (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            Voir sur GitHub
          </a>
        ) : (
          <a href={project.web_url} target="_blank" rel="noopener noreferrer">
            Voir sur GitLab
          </a>
        )}
      </div>
    );
  };

export default ProjectCard;
