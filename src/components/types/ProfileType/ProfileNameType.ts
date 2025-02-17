export type ProfileProps = {
  id: number;
  name: string;
  profileImage: string | null;
  mainTitle: string;
  freezeCount: number;
  mainBanner?: string;
  friendCount?: number;
  studyCount?: number;
  message?: string;
};
