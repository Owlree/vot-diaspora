export function GetUrlVars(): {[key: string]: string} {
  let vars: {[key: string]: string} = {};

  const href = window.location.href;
  href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (_, key, value) => {
    vars[key] = value;
    return value;
  });

  return vars;
}
