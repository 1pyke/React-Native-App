export interface ProfileProps {
    username: string;
    password: string;
    email?: string;
    profileImage?: any;
    phoneNumber?: string;
    location?: string;
  }
  export interface PersonState{
    isLogedIn:boolean;
    personData:any[]
}