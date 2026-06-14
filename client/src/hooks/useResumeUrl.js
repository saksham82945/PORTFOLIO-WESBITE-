import { useState, useEffect } from 'react';
import api from '../utils/api';
import { PERSONAL } from '../data/personalData';

export default function useResumeUrl() {
  const [url, setUrl] = useState(PERSONAL.resumeUrl);

  useEffect(() => {
    // Attempt to fetch the latest uploaded resume from the backend
    api.get('/documents')
      .then(({ data }) => {
        const resumes = data.filter(d => d.category === 'Resume');
        if (resumes.length > 0) {
          // Use the most recently uploaded resume
          setUrl(resumes[0].fileUrl);
        }
      })
      .catch(err => console.error('Failed to fetch resume:', err));
  }, []);

  return url;
}
