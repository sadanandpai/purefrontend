interface Props {
  label: string;
  pending?: boolean;
}

export function SubmitButton({ label, pending }: Props) {
  return (
    <button type="submit" className="btn" disabled={pending}>
      {pending ? "Submitting..." : label}
    </button>
  );
}
