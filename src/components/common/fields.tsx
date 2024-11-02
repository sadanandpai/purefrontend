import { useState } from "react";

interface Props {
  value?: string;
}

export function FullNameField({ value = "" }: Props) {
  const [name, setName] = useState(value);

  return (
    <input
      id="name"
      name="name"
      placeholder="Name"
      type="text"
      minLength={3}
      maxLength={50}
      required
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}

export function EmailField({ value = "" }: Props) {
  const [email, setEmail] = useState(value);

  return (
    <input
      id="email"
      name="email"
      placeholder="Email"
      type="email"
      // required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  );
}

export function PasswordField({ value = "" }: Props) {
  const [password, setPassword] = useState(value);

  return (
    <input
      id="password"
      name="password"
      placeholder="Password"
      minLength={8}
      maxLength={20}
      type="password"
      required
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  );
}

export function NewPasswordField({ value = "" }: Props) {
  const [password, setPassword] = useState(value);

  return (
    <input
      id="newPassword"
      name="newPassword"
      placeholder="New password"
      minLength={8}
      maxLength={20}
      type="password"
      required
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  );
}
