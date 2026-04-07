import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve(process.cwd(), 'public/assets')
const RASTER_EXT_RE = /\.(?:avif|webp|jpe?g|png)$/i
const GENERATED_VARIANT_RE = /@[123]x\.webp$/i

function isConvertibleFile(name) {
  return RASTER_EXT_RE.test(name) && !GENERATED_VARIANT_RE.test(name)
}

function stripRasterExtensions(name) {
  let output = name

  while (RASTER_EXT_RE.test(output)) {
    output = output.replace(RASTER_EXT_RE, '')
  }

  return output
}

async function collectFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath)))
      continue
    }

    if (!entry.isFile()) continue
    if (!isConvertibleFile(entry.name)) continue

    files.push(fullPath)
  }

  return files
}

function targetWidths(width) {
  const w3 = Math.max(1, Math.round(width))
  const w2 = Math.max(1, Math.round(width))
  const w1 = Math.max(1, Math.round(width * 0.85))

  return {
    1: w1,
    2: w2,
    3: w3,
  }
}

async function ensureDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
}

async function main() {
  const sources = await collectFiles(ROOT)

  let written = 0
  let skipped = 0

  for (const inputPath of sources) {
    const meta = await sharp(inputPath, { failOn: 'none' }).metadata()

    if (!meta.width || !meta.height) {
      skipped += 1
      continue
    }

    const parsed = path.parse(inputPath)
    const stem = stripRasterExtensions(parsed.name)
    const widths = targetWidths(meta.width)

    for (const scale of [1, 2, 3]) {
      const outFile = path.join(parsed.dir, `${stem}@${scale}x.webp`)
      await ensureDir(outFile)

      await sharp(inputPath, { failOn: 'none' })
        .rotate()
        .resize({ width: widths[scale], withoutEnlargement: true })
        .webp({ quality: 88, effort: 6 })
        .toFile(outFile)

      written += 1
    }
  }

  console.log(`Converted sources: ${sources.length}`)
  console.log(`Written variants: ${written}`)
  if (skipped) {
    console.log(`Skipped files (missing dimensions): ${skipped}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
