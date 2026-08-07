/* Cached Payload local-API client. Use from server components only. */

import { getPayload } from 'payload';
import config from '@payload-config';
import { createMockPayloadClient } from './mock/client';

/* Mock mode serves the site from static fixtures instead of the database.
   Enabled explicitly via USE_MOCK_DATA, or automatically when Payload cannot
   possibly boot (no secret / no connection string) — which is what turns a
   missing env var into a rendering site rather than a 500 on every route. */
export const isMockMode = () =>
  process.env.USE_MOCK_DATA === 'true' ||
  process.env.USE_MOCK_DATA === '1' ||
  !process.env.PAYLOAD_SECRET ||
  !process.env.DATABASE_URI;

export const getPayloadClient = async (): Promise<any> => {
  if (isMockMode()) return createMockPayloadClient();
  return getPayload({ config });
};
