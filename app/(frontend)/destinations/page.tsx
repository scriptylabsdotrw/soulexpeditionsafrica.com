import { getDestinations } from '@/lib/data';
import DestinationsView from './_view';

export const dynamic = 'force-dynamic';

export default async function DestinationsPage() {
  const destinations = await getDestinations();
  return <DestinationsView destinations={destinations} />;
}
