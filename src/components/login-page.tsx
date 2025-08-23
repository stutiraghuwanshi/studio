"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "./icons";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

type LoginPageProps = {
  onLoginSuccess: (gender: string) => void;
};

const HARDCODED_USERNAME = "stutiraghuwanshi";
const HARDCODED_PIN = "1510";
const HARDCODED_DOB = "2004-10-15";

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [securityPin, setSecurityPin] = useState("");
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^[0-9]*$/.test(value)) {
      setSecurityPin(value);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username.includes(" ")) {
      toast({
        variant: "destructive",
        title: "Invalid Username",
        description: "Username cannot contain spaces.",
      });
      return;
    }

    if (!gender) {
      toast({
        variant: "destructive",
        title: "Gender not selected",
        description: "Please select a gender.",
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (username === HARDCODED_USERNAME && securityPin === HARDCODED_PIN && dob === HARDCODED_DOB) {
        onLoginSuccess(gender);
      } else {
        toast({
            variant: "destructive",
            title: "Login Failed",
            description: "Incorrect credentials. Please try again.",
        })
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleSubmit}>
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
                <Icons.logo className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Enter your details to access the dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="your_username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </div>
             <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup
                    value={gender}
                    onValueChange={setGender}
                    className="flex space-x-4 pt-2"
                    required
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Not prefer to disclose</Label>
                    </div>
                </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="securityPin">Security Pin</Label>
              <Input
                id="securityPin"
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="••••"
                value={securityPin}
                onChange={handlePinChange}
                required
                maxLength={4}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
