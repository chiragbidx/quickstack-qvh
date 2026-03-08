"use client"; // Client-only: mounts window error hooks; safe to import into server layouts.

import { useEffect } from "react";
import { initErrorReporter } from "../scripts/error-reporter";

export function ErrorReporter() {
  // Feature: initializes browser-side error capture and reporting.
  useEffect(() => {
    initErrorReporter();
  }, []);

  return null;
}

export default ErrorReporter;
