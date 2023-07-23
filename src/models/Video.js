// src/models/Video.js

class Video {
    constructor(id, title, url, thumbnail, description, data, duracao, views, likes, dislikes, status) {
      this.id = id;
      this.title = title;
      this.url = url;
      this.thumbnail = thumbnail;
      this.description = description;
      this.data = data;
      this.duracao = duracao;
      this.views = views;
      this.likes = likes;
      this.dislikes = dislikes;
      this.status = status;
    }
  }
  
  export default Video;
  