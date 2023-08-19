export type Task = {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

export type EditedTask = {
    id: number;
    title: string;
}

export type CsrfToken = {
  csrfToken: string;
};

export type Credential = {
  email: string;
  password: string;
};
