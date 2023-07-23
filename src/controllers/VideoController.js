// src/controllers/VideoController.js

import Video from '../models/Video';

const API_URL = 'http://192.168.0.2:3000/api/videos';

export const fetchVideos = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    return data.map(video => new Video(
      video.id,
      video.title,
      video.url,
      video.thumbnail,
      video.description,
      video.data,
      video.duracao,
      video.views,
      video.likes,
      video.dislikes,
      video.status
    ));
  } catch (error) {
    console.error('Failed to fetch videos:', error);
    throw error;
  }
};
