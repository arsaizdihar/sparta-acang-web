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
    images: StrapiImage[];
  };
}

export interface EventPageData {
  event: {
    slug: string;
    title: string;
    description: string;
    prasayarat: string;
    lokasi: string;
    waktuMulai: string;
    waktuSelesai: string;
    thumbnail: { data: StrapiImage };
    dokumentasi: { data: StrapiImage[] };
  };
  showMilestone: boolean;
  showEventRegister: boolean;
  showKesan: boolean;
}
