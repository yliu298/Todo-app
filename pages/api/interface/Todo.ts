export interface Todo {
  id: string;
  fields: TodoFields[];
}

export interface TodoFields {
  description: string;
  isCompleted: boolean;
  deadline: Date;
}

export interface TodoAPIResponse {
  success?: string;
  error?: string;
  data?: Todo[] | Todo;
}