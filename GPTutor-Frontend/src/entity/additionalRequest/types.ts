export interface AdditionalRequest {
  id: string;
  active: boolean;
  title: string;
  message: string;
}

export interface AdditionalRequestCreate {
  title: string;
  message: string;
  active: boolean;
}
