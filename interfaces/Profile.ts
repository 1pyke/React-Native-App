import * as Location from "expo-location";
export interface ProfileProps {
    username: string;
    password: string;
    email?: string;
    profileImage?: any;
    phoneNumber?: string;
    location?:{}
    ;
  }
  export interface PersonState{
    isLogedIn:boolean;
    personData:{}
}