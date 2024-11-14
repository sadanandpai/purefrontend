"use client";

import { TextField } from "@radix-ui/themes";

interface Props {
  value?: string;
  setValue?: (value: string) => void;
  field?: string;
  placeHolder?: string;
}

export function FullNameField({ value = "", setValue }: Props) {
  return (
    <TextField.Root
      id="name"
      name="name"
      placeholder="Full Name"
      type="text"
      minLength={3}
      maxLength={50}
      required
      value={value}
      onChange={(e) => setValue?.(e.target.value)}
    />
  );
}

export function EmailField({ value = "", setValue }: Props) {
  return (
    <TextField.Root
      id="email"
      name="email"
      placeholder="Email"
      type="text"
      required
      value={value}
      onChange={(e) => setValue?.(e.target.value)}
    />
  );
}

export function PasswordField({
  field = "password",
  placeHolder = "Password",
}: Props) {
  return (
    <TextField.Root
      id={field}
      name={field}
      placeholder={placeHolder}
      minLength={8}
      maxLength={20}
      type="password"
      required
    />
  );
}
