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

const originUrl = 'https://esm.sh/'

export const transformImportMap = (dependencies: string, url: string = originUrl) => {
  const importMap: {
    imports: Record<string, string>
  } = {
    imports: {}
  }

  try {
    const map = JSON.parse(dependencies);

    Object.entries(map).forEach(([key, value]) => {
      const filteredValue = filterVersion(value as string);

      importMap.imports[key] = filteredValue.includes('@') 
        ? `${url}${filteredValue}` 
        : `${url}${key}@${filteredValue}`;
    });
  } catch {

  }

  return JSON.stringify(importMap)
}

type NestedObject = Record<string, any>;
type FlattenedObject = Record<string, any>;

export const flattenObject = (obj: NestedObject, parentPath: string = '', result: FlattenedObject = {}): FlattenedObject => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const currentPath = parentPath ? `${parentPath}/${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          flattenObject(obj[key], currentPath, result);
      } else {
          result[currentPath] = obj[key];
      }
    }
  }
  return result
}