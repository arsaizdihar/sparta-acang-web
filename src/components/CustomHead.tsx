import Head from 'next/head';
import React from 'react';

const CustomHead: React.FC<{
  title?: string;
  description?: string;
  imageUrl?: string;
}> = ({
  title = 'Sudoverse',
  description = 'Acara angkatan SUDO21 yang berperan menjadi wadah untuk menumbuhkan dan meningkatkan rasa kekeluargaan serta kebersamaan antar anggota SUDO21 dan juga dengan warga HMIF melalui aksi yang bermanfaat bagi masyarakat sekitar',
  imageUrl = 'https://sudoverse.com/images/web-preview.png',
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="og:card" content={'summary'} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:image" content={imageUrl} />
    </Head>
  );
};

export default CustomHead;
