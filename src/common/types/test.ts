export interface TestOutputProps {
  name: string;
  status: string;
  error: string;
}

export interface OutputStateProps {
  isLoading?: boolean;
  status?: boolean;
  output?: TestOutputProps;
}

export interface OutputsStateProps {
  isLoading?: boolean;
  status?: boolean;
  outputs?: TestOutputProps[];
}
