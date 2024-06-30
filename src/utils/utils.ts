export const maxSequenceTabName = (files: string[]) => {
  const result = files.reduce((max, fileName) => {
    const match = fileName.match(/Comp(\d+)\.tsx/);
    if (match) {
      const sequenceNumber = parseInt(match[1], 10);
      return Math.max(max, sequenceNumber);
    }
    return max;
  }, 0);
  return `Comp${result + 1}.tsx`;
};

export const getIframeUrl = (iframeRaw: string) => {
  const shimsUrl = '//unpkg.com/es-module-shims@1.8.0/dist/es-module-shims.js'
  // 判断浏览器是否支持esm ，不支持esm就引入es-module-shims
  const newIframeRaw =
    typeof import.meta === 'undefined'
      ? iframeRaw.replace('<!-- es-module-shims -->', `<script async src="${shimsUrl}"></script>`)
      : iframeRaw
  return URL.createObjectURL(new Blob([newIframeRaw], { type: 'text/html' }))
}

export const getHashParams = (paramName: string) => {
  let params;

  const hash = window.location.hash;
  const hashQueryStart = hash.indexOf('?');
  
  if (hashQueryStart !== -1) {
    const hashQueryString = hash.substring(hashQueryStart + 1);
    params = new URLSearchParams(hashQueryString);
    if (params.has(paramName)) {
        return params.get(paramName);
    }
  }

  params = new URLSearchParams(window.location.search);
  return params.get(paramName);
}

export const changeUrlHash = (hash: string) => {
  const originalHash = window.location.hash;
  const hashParamsIndex = originalHash.indexOf('?');

  const baseHash = (hashParamsIndex === -1) ? originalHash : originalHash.substring(0, hashParamsIndex);
  const existingParams = (hashParamsIndex === -1) ? '' : originalHash.substring(hashParamsIndex + 1);

  const searchParams = new URLSearchParams(existingParams);

  searchParams.set('code', hash || '');

  const newHash = `${baseHash}?${searchParams.toString()}`;

  window.history.pushState({}, '', `${window.location.pathname}${newHash}`)
}
