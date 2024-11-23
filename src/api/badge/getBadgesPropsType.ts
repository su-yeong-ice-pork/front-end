export type BadgeType = {
  id: number;
  fileName: string;
  name: string;
  description: string;
};

export type getBadgesPropsType = {
  success: boolean;
  response: {
    badgeCount: number;
    badges: BadgeType[];
  } | null;
  error: any;
};

export type BadgesProps = {
  badges: BadgeType[];
};
