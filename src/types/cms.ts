export interface StrapiImage {
  id: string;
  attributes: {
    url: string;
  };
}

export interface MilestoneData {
  attributes: {
    group: number;
    appName: string;
    description: string;
    images: { data: StrapiImage[] };
  };
}
