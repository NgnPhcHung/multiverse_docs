export type UserMeta = {
  id: string;
  info: {
    name: string;
    color: string;
    picture: string;
  };
};

export type UserAwareness = {
  user?: UserMeta["info"];
};

export type AwarenessList = [number, UserAwareness][];
