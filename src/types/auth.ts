export type LoginType = {
  email: string;
  password: string;
};

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  avatar: string;
  user_type: string;
  login_attempt: {
    trials: number;
    account_disabled: boolean;
  };
  default_code: string;
  default_pass: boolean;
  gender: string;
  role_id: string;
  suspend_reason: string;
  status: number;
  data_mode: string;
  createdAt: string;
  updatedAt: string;
  role_list: {
    create: string[];
    view: string[];
    update: string[];
    delete: string[];
  };
  auth_id: string;
}

export interface LoggedInUser {
  avatar: string;
  createdAt: string;
  email: string;
  gender: string;
  name: string;
  permission: any[];
  status: number;
  updatedAt: string;
  user_type: string;
}

export type ResetPasswordType = LoginType & {
  otp: string;
};
