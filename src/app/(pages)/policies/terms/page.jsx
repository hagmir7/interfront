import React from 'react';
import { api } from '@/lib/api';
import PageComponent from '@/components/PageComponent';
const slug = 'terms'
export async function generateMetadata() {
  try {
    const response = await api.get(`pages/${slug}`)
    const page = await response.data

    return {
      title: page.title || `Page ${slug}`,
      description:
        page.description || `Ceci est le page ${slug}`,
    }
  } catch (error) {
    return {
      title: `Page ${title}`,
      description: `Ceci est le page ${slug}`,
    }
  }
}

const page = async () => {
  return (<PageComponent slug={slug} />)
};

export default page;