import type { NextApiRequest, NextApiResponse } from 'next';
import { table, getMinifiedRecord } from './utils/Airtable';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function ProtectedRoute(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { id } = req.body;
  try {
    const deleteRecords = await table.destroy([id]);
    res.status(200).json(getMinifiedRecord(deleteRecords[0]));
  } catch (err) {
    res.status(500).json({ msg: 'Something went wrong!' });
  }
});
