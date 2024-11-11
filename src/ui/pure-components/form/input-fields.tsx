"use client";

import { TextField } from "@radix-ui/themes";

interface Props {
  value: string;
  setValue: (value: string) => void;
}

export function FullNameField({ value = "", setValue }: Props) {
  return (
    <TextField.Root
      id="name"
      name="name"
      placeholder="Full Name"
      type="text"
      minLength={1}
      maxLength={50}
      required
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export function EmailField({ value = "", setValue }: Props) {
  return (
    <TextField.Root
      id="email"
      name="email"
      placeholder="Email"
      type="email"
      required
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export function PasswordField() {
  return (
    <TextField.Root
      id="password"
      name="password"
      placeholder="Password"
      minLength={8}
      maxLength={20}
      type="password"
      required
    />
  );
}

export function NewPasswordField() {
  return (
    <TextField.Root
      id="newPassword"
      name="newPassword"
      placeholder="New password"
      minLength={1}
      maxLength={20}
      type="password"
      required
    />
  );
}
