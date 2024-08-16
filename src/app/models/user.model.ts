// src/app/models/user.model.ts
export interface User {
    email: string;
  phone?: string;
  name: string;
  password: string;
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  