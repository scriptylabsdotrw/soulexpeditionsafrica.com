/* Cached Payload local-API client. Use from server components only. */

import { getPayload } from 'payload';
import config from '@payload-config';
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

/* Mock mode serves the site from static fixtures instead of the database.
   Enabled explicitly via USE_MOCK_DATA, or automatically when Payload cannot
   possibly boot (no secret / no connection string) — which is what turns a
   missing env var into a rendering site rather than a 500 on every route. */
export const isMockMode = () =>
  process.env.USE_MOCK_DATA === 'true' ||
  process.env.USE_MOCK_DATA === '1' ||
  !process.env.PAYLOAD_SECRET ||
  !process.env.DATABASE_URI;

export const getPayloadClient = async (): Promise<PayloadDataClient> => {
  if (isMockMode()) return createMockPayloadClient();
  return getPayload({ config }) as unknown as PayloadDataClient;
};
