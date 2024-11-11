import { Button } from "@radix-ui/themes";

interface Props {
  label: string;
  pending?: boolean;
}

export function SubmitButton({ label, pending }: Props) {
  return (
    <Button type="submit" loading={pending}>
      {label}
    </Button>
  );
}
