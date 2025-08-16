"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";

interface AppErrorProps {
  error: any;
  message?: string;
  className?: string;
}

export default function AppError({ error, message, className }: AppErrorProps) {
  useEffect(() => {
    const status = error?.statusCode;
    switch (status) {
      case 404:
      case 403:
      case 500:
    }
  }, [error]);

  return (
    <Alert className={`${className} flex items-center justify-center w-full h-full`}>
      <AlertDescription className="text-muted-foreground flex items-center gap-2 text-center text-sm">
        <AlertCircle className="h-4 w-4 text-red-500" />
        {error?.message || message || "Failed to load data"}
      </AlertDescription>
    </Alert>
  );
}
