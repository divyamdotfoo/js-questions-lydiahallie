"use client";

import { useMain } from "@/store";
import { useEffect } from "react";

export function SyncLocal() {
  // change this to only selected else and avoid overrendering
  const { setIndex, setQuestions } = useMain();
  useEffect(() => {}, []);
}
