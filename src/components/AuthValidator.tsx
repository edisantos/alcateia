"use client";

import useAuthValidation from "@/services/validateToken";

export default function AuthValidator() {
  useAuthValidation();
  return null; // Não renderiza nada visualmente
}