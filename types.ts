import { LocationObject } from 'expo-location';
export type IsLoginedIn = {
    loggedin?: boolean;
    Loading?: boolean;
    location: LocationObject;
  };
  export type LoginProps = {
    emailType: string;
    userNameType: string;
    passwordType: string;
    userInfoType:object;
  };
  export type UploadImage = {
    gallery:boolean;
  };

export interface ProfileProps {
  location: LocationObject;
  // Add other properties as needed
}