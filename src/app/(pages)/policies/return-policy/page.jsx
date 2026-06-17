import React from 'react';
import { api } from '@/lib/api';
import PageComponent from '@/components/PageComponent';


const slug = 'return-policy';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  try {
    const response = await api.get(`pages/${slug}`);
    const page = response.data;

    return {
      title: page.title || `Page ${slug}`,
      description: page.description || `Ceci est le page ${slug}`,
      alternates: {
        canonical: `/policies/return-policy`,
      },
    };
  } catch (error) {
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