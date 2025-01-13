import { UserRole } from "./role.enum";

export interface User {
  pseudo: string;
  role: UserRole;
  uuid: string; 
  points: number;
  alive: boolean;
}