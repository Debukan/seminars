import React, { useEffect, useState } from "react";
import type { User } from "../types";
import { getProfile, updateProfile } from "../api/userApi";
import { ProfileCard } from "../components/ProfileCard";
import { handleError } from "../helpers/handleError";

type Props = {
  token: string;
};

export function ProfilePage({ token }: Props) {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [nickname, setNickname] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    getProfile(token).then((user) => {
      if (!user?.id) throw new Error("Сервер вернул пустой или некорректный профиль.");
      if (!active) return;
      setProfile(user);
      setNickname(user.nickname);
      setBio(user.bio);
    }).catch((error: unknown) => {
      if (active) setError(handleError(error));
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, [token]);

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      const user = await updateProfile(token, { nickname, bio });
      if (!user?.id) throw new Error("Сервер вернул пустой или некорректный профиль.");
      setProfile(user);
    } catch (error) {
      setError(handleError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Профиль</h2>
      {loading && <p>Загрузка...</p>}
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
      <ProfileCard profile={profile} />
      <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <input value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Ник" />
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Описание" />
        <button onClick={handleSave} disabled={loading}>
          Сохранить
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
