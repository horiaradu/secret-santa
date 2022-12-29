export interface Member {
  phone: string;
  name: string;
  url: string;
  url2?: string;
}

export type MaybeMember =
  | ({
      status: 'found';
    } & Member)
  | {
      status: 'not-found';
      phone: string;
    };
