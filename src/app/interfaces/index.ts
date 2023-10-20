export interface ResponsePosts {
  ok: boolean;
  page: number;
  posts: Post[];
}


export interface Post {
  _id?: number;
  message?: string;
  images?: string[];
  coords?: string;
  user?: User;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id?: string;
  username?: string;
  email?: string;
  password?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FileUpload {
  name: string;
  data: any;
  encoding: string;
  tempFilePath: string;
  truncated: boolean;
  mimetype: string;
}