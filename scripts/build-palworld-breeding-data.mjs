import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const sourcePath = process.argv[2];
const outputPath = resolve(
  process.argv[3] || 'public/data/palworld-breeding-1.0.json',
);

if (!sourcePath) {
  throw new Error(
    'Usage: node scripts/build-palworld-breeding-data.mjs <source-json> [output-json]',
  );
}

const sourceBuffer = await readFile(resolve(sourcePath));
const sourceHash = createHash('sha256').update(sourceBuffer).digest('hex');
const source = JSON.parse(sourceBuffer.toString('utf8'));

if (!Array.isArray(source.records) || !source.dataset) {
  throw new Error('The source file does not contain dataset metadata and records.');
}

if (source.records.length !== source.dataset.result_count) {
  throw new Error(
    `Record count mismatch: expected ${source.dataset.result_count}, received ${source.records.length}.`,
  );
}

const titleCasePalId = (id) =>
  id
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const ids = new Set();
const recipes = source.records.map((record) => {
  ids.add(record.parent_a);
  ids.add(record.parent_b);
  ids.add(record.child);

  return [
    record.parent_a,
    record.parent_b,
    record.child,
    record.special_combination ? 1 : 0,
    record.parent_a_gender || '',
    record.parent_b_gender || '',
  ];
});

const pals = [...ids]
  .map((id) => [id, titleCasePalId(id)])
  .sort((left, right) => left[1].localeCompare(right[1]));

const output = {
  schemaVersion: 1,
  dataset: {
    ...source.dataset,
    source_sha256: sourceHash,
    methodology_url: 'https://palweave.com/data-methodology',
    generated_for: 'OnlineTool.me Palworld Breeding Calculator',
  },
  pals,
  recipes,
};

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, JSON.stringify(output));

console.log(
  JSON.stringify(
    {
      outputPath,
      sourceHash,
      pals: pals.length,
      recipes: recipes.length,
    },
    null,
    2,
  ),
);
