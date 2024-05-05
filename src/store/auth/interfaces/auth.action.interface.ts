export interface ChangeNameActionPayload {
  firstName: string;
  lastName: string | null;
}

export interface RestorePasswordActionPayload {
  email: string;
  password: string;
  restorePasswordHash: string;
}

export interface ChangeNameActionPayload {
  firstName: string;
  lastName: string | null;
}
