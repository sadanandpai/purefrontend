import { useFormStatus } from "react-dom";

interface Props {
  error?: string;
}

export function ErrorField({ error }: Props) {
  const { pending } = useFormStatus();

  if (pending) {
    return null;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return null;
}
