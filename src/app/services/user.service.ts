// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    { email: 'john@example.com', phone: '1234567890', name: 'John', password: 'john123' },
    { email: 'jane@example.com', phone: '0987654321', name: 'Jane', password: 'jane123' },
  ];

  private organizations = [
    { name: 'Org1', id: 'ORG001' },
    { name: 'Org2', id: 'ORG002' },
    { name: 'Org3', id: 'ORG003' }
  ];

  private userData: any ={};

  userExists(email: string, phone?: string): boolean {
    return this.users.some(user => user.email === email || user.phone === phone);
  }

  validatePassword(email: string, password: string): boolean {
    const user = this.users.find(user => user.email === email);
    return user ? user.password === password : false;
  }

  getUserNameByEmail(email: string): string | null {
    const user = this.users.find(user => user.email === email);
    return user ? user.name : null;
  }

  getOrganizations() {
    return this.organizations;
  }

  validateOrganizationId(id: string) {
    return this.organizations.some(org => org.id === id);
  }

  setUser(data:any){
    this.userData= data;
  }

  getUser(){
    return this.userData;
  }

}
