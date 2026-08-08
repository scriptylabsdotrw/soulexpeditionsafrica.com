/* Cached Payload local-API client. Use from server components only. */

import { createMockPayloadClient } from './mock/client';

type PayloadDataClient = {
  find: (args: {
    collection: string;
    where?: Record<string, any>;
    sort?: string;
    limit?: number;
    depth?: number;
    select?: Record<string, boolean>;
  }) => Promise<{
    docs: Record<string, any>[];
    totalDocs: number;
  }>;
  findGlobal: (args: { slug: string }) => Promise<Record<string, any>>;
};

/* The public site is mock-first while the backend is being built. Payload and
   Postgres are enabled only when USE_MOCK_DATA is explicitly false (or 0). */
export const isMockMode = () =>
  process.env.USE_MOCK_DATA !== 'false' && process.env.USE_MOCK_DATA !== '0';

export const getPayloadClient = async (): Promise<PayloadDataClient> => {
  if (isMockMode()) return createMockPayloadClient();

  const [{ getPayload }, { default: config }] = await Promise.all([
    import('payload'),
    import('@payload-config'),
  ]);
  return getPayload({ config }) as unknown as PayloadDataClient;
};
