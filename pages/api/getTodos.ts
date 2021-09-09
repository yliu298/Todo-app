import type { NextApiRequest, NextApiResponse } from 'next';
import { table, minifyRecords } from './utils/Airtable';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function ProtectedRoute(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const session = getSession(req, res);
  if (!session) {
    return res.status(400).json({ msg: 'Something went wrong!' });
  }

  try {
    const records = await table
      .select({ filterByFormula: `userId = '${session.user.sub}'`, sort: [{ field: 'deadline' }] })
      .firstPage();
    const minifiedRecords = minifyRecords(records);
    res.status(200).json(minifiedRecords);
  } catch (err) {
    res.status(500).json({ msg: 'Something went wrong!' });
  }
});
