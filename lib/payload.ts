/* Cached Payload local-API client. Use from server components only. */

import { getPayload } from 'payload';
import config from '@payload-config';

export const getPayloadClient = async () => getPayload({ config });
