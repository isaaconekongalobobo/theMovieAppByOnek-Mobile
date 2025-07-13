export interface ErrorMessageType {
    message: string
}

export interface LoadingSpinnerProps {
    size: number
}

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  created: string | null;
  profilImage: string | null;
};

export interface UserConnectedStore {
  userConnected: User | null
  setUserConnected: (autheticatedUser: User | null) => void
}
