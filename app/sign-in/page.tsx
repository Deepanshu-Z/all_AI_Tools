import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function signIn() {
  return (
    <div>
      <Input type="email" placeholder="Email" />
      <Input type="username" placeholder="name" />
      <Input type="date" placeholder="DOB" />
      <Input type="password" placeholder="password" />
      <Button type="submit" />
    </div>
  );
}
