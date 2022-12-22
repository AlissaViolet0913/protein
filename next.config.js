/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  rewrites: async () => {
    const dataUrl = process.env.NEXT_PUBLIC_PROTEIN_DATA
    return [
      {
        source: '/api/items',
        destination: `${dataUrl}/items`,
      },
      {
        source: '/api/items/:slug',
        destination: `${dataUrl}/items/:slug`,
      },

      {
        source: '/api/users',
        destination: `${dataUrl}/users`,
      },
      {
        source: '/api/users/:slug',
        destination: `${dataUrl}/users/:slug`,
      },

      {
        source: '/api/purchaseHistories',
        destination: `${dataUrl}/purchaseHistories`,
      },
      {
        source: '/api/purchaseHistories/:slug',
        destination: `${dataUrl}/purchaseHistories/:slug`,
      },

      {
        source: '/api/favorites',
        destination: `${dataUrl}/favorites`,
      },
      {
        source: '/api/favorites/:slug',
        destination: `${dataUrl}/favorites/:slug`,
      },
      {
        source: '/api/subscriptionCart',
        destination: `${dataUrl}/subscriptionCart`,
      },
      {
        source: '/api/subscriptionCart/:slug',
        destination: `${dataUrl}/subscriptionCart/:slug`,
      },
      {
        source: '/api/subscription',
        destination: `${dataUrl}/subscription`,
      },
      {
        source: '/api/subscription/:slug',
        destination: `${dataUrl}/subscription/:slug`,
      },
      {
        source: '/api/subscriptionHistories',
        destination: `${dataUrl}/subscriptionHistories`,
      },
      {
        source: '/api/subscriptionHistories/:slug',
        destination: `${dataUrl}/subscriptionHistories/:slug`,
      },
      {
        source: '/api/carts',
        destination: `${dataUrl}/carts`,
      },
      {
        source: '/api/carts/:slug',
        destination: `${dataUrl}carts/:slug`,
      },
      {
        source: '/',
        destination: '/items/',
      },
      // {
      //   source: 'PROTEIN',
      //   destination: 'NEXT_PUBLIC_PROTEIN',
      // },
      // {
      //   source: 'PROTEIN_DATA',
      //   destination: 'NEXT_PUBLIC_PROTEIN_DATA',
      // },
    ];
  },
};

require('dotenv').config({ path: `./.env.${process.env.ENVIRONMENT}` })

module.exports = {}

module.exports = nextConfig;
