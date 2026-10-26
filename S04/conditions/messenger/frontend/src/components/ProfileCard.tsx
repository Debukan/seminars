import React from "react";
import type { User } from "../types";

type Props = {
  profile: User | null;
};

export function ProfileCard({ profile }: Props) {
  if (!profile) return null;

  return (
    <div className="profile-card">
      <p><strong>Никнейм:</strong> {profile.nickname}</p>
      <p><strong>Телефон:</strong> {profile.phone}</p>
      <p><strong>Описание:</strong> {profile.bio}</p>
    </div>
  );
}

export default ProfileCard;
