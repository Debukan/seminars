import axios from "axios";
import type { User } from "../types";

const API_URL = import.meta.env?.VITE_API_URL || "http://localhost:3001";

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
}

export async function getProfile(token: string): Promise<User> {
  const response = await fetch(`${API_URL}/users/me`, {
    headers: authHeaders(token)
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch profile: ${response.statusText}`);
  }
  return response.json();
}

export type UpdateProfilePayload = Partial<Pick<User, "nickname" | "bio">>;

export async function updateProfile(token: string, { nickname, bio }: UpdateProfilePayload): Promise<User> {
  const response = await axios.put<User>(`${API_URL}/users/me`, { nickname, bio }, {
    headers: authHeaders(token)
  });
  return response.data;
}
