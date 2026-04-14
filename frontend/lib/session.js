import { v4 as uuidv4 } from 'uuid';

export const getSessionId = () => {
  if (typeof window === 'undefined') return '';
  let sessionId = localStorage.getItem('amazon_session_id');
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('amazon_session_id', sessionId);
  }
  return sessionId;
};
