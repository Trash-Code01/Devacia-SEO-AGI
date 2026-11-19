// Aggregate only: never export client names, contact details, or individual records.
import fs from 'node:fs/promises';
import nextEnv from '@next/env';
import { MongoClient } from 'mongodb';
nextEnv.loadEnvConfig(process.cwd(), false, { info() {}, error() {} });
const report = { collectedAt: new Date().toISOString(), databaseScope: 'lead-cluster.leads from configured environment; production identity not independently verified', start: '2026-07-01', endExclusive: '2026-09-29' };
let client;
try {
  client = new MongoClient(process.env.MONGO_URI, { serverSelectionTimeoutMS: 15000, connectTimeoutMS: 15000 });
  await client.connect();
  const collection = client.db('lead-cluster').collection('leads');
  report.groups = await collection.aggregate([
    { $match: { created_at: { $gte: new Date(report.start), $lt: new Date(report.endExclusive) }, is_deleted: { $ne: true } } },
    { $group: { _id: { status: '$status', stage: '$stage', hasFirstTouch: { $cond: [{ $ifNull: ['$attribution.firstTouch.landing_page', false] }, true, false] }, hasGaId: { $cond: [{ $ifNull: ['$attribution.gaClientId', false] }, true, false] }, organicMedium: { $eq: ['$attribution.firstTouch.utm_medium', 'organic'] } }, count: { $sum: 1 } } },
  ], { maxTimeMS: 10000 }).toArray();
  report.status = 'success';
} catch (error) { report.status = 'unavailable'; report.error = { name: error.name, code: error.code || null }; }
finally { if (client) await client.close(); }
await fs.mkdir('docs/seo/evidence', { recursive: true });
await fs.writeFile('docs/seo/evidence/crm-aggregate.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report));
