import React from 'react';
import { api } from '@/lib/api';
import PageComponent from '@/components/PageComponent';

const slug = 'privacy';

export const dynamic = 'force-static';

export async function generateMetadata() {
  try {
    const response = await api.get(`pages/${slug}`);
    const page = response?.data;

    return {
      title: page?.title || `Page ${slug}`,
      description: page?.description || `Ceci est le page ${slug}`,
    };
  } catch (error) {
    console.error('generateMetadata error:', error);

    return {
      title: `Page ${slug}`,
      description: `Ceci est le page ${slug}`,
    };
  }
}

const Page = async () => {
  return <PageComponent slug={slug} />;
};

export default Page;