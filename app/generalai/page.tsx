"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function GeneralAIEntry() {
  const router = useRouter();

  useEffect(() => {
    const projectId = uuidv4();
    const frameId = Math.floor(1000 + Math.random() * 9000);

    router.replace(`/generalai/${projectId}?frameId=${frameId}`);
  }, []);

  return null;
}
