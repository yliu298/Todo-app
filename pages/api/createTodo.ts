import type { NextApiRequest, NextApiResponse } from 'next';
import { table } from './utils/Airtable';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function ProtectedRoute(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { description, deadline } = req.body;
  const session = getSession(req, res);

  if (!session) {
    return res.status(400).json({ msg: 'Something went wrong!' });
  }

  try {
    const createRecords = await table.create([{ fields: { description, userId: session.user.sub, deadline } }]);
    const createRecord = {
      id: createRecords[0].id,
      fields: createRecords[0].fields,
    };
    res.status(201).json(createRecord);
  } catch (err) {
    res.status(500).json({ msg: 'Something went wrong!' });
  }
});
