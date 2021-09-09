import type { NextApiRequest, NextApiResponse } from 'next';
import { table, getMinifiedRecord } from './utils/Airtable';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function ProtectedRoute(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { id, fields } = req.body;
  try {
    const updatedRecords = await table.update([{ id, fields }]);

    res.status(200).json(getMinifiedRecord(updatedRecords[0]));
  } catch (err) {
    res.status(500).json({ msg: 'Something went wrong!' });
  }
});
