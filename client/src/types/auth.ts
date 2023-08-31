export interface loginData {
  email: string;
  password: string;
}

export interface registerData {
  username: string;
  email: string;
  password: string;
}

export interface resetPassword {
  password: string;
  token: any;
}
