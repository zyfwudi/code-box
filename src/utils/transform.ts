import { strFromU8, strToU8, unzlibSync, zlibSync } from 'fflate';

export const fileNameToLanguage = (name: string) => {
  const suffix = name.split('.').pop() || '';

  if (['js', 'jsx'].includes(suffix)) return 'javascript';
  if (['ts', 'tsx'].includes(suffix)) return 'typescript';
  if (['json'].includes(suffix)) return 'json';
  if (['css'].includes(suffix)) return 'css';

  return 'javascript';
}

export const utoa = (data: string) => {
  const buffer = strToU8(data);
  const zipped = zlibSync(buffer, { level: 9 });
  const binary = strFromU8(zipped, true);
  return btoa(binary);
};

export const atou = (base64: string) => {
  const binary = atob(base64);

  // zlib header (x78), level 9 (xDA)
  if (binary.startsWith('\x78\xDA')) {
    const buffer = strToU8(binary, true);
    const unzipped = unzlibSync(buffer);
    return strFromU8(unzipped);
  }

  // old unicode hacks for backward compatibility
  // https://base64.guru/developers/javascript/examples/unicode-strings
  return decodeURIComponent(escape(binary));
};

const filterVersion = (str: string): string => {
  if (str === 'laster') return ''
  return str.replace(/^[~*^]/, "")
}

const parseImportMap = (str: string) => {
  const matches = str.matchAll(/(\w+):\s*([^,\n]+)/g)

  const map: Record<string, string> = {}

  for (const match of matches) {
    map[match[1]] = filterVersion(match[2])
  }

  return map
}

const originUrl = 'https://esm.sh/'

export const transformImportMap = (dependencies: string, url: string = originUrl) => {

  const map = parseImportMap(dependencies)

  const imports = Object.entries(map).map(([key, value]) => {
    return `"${key}": "${url}${key}@${value}"`
  })

  const importMap = `
{
  "imports": ${imports}
}
` 
  return importMap
}