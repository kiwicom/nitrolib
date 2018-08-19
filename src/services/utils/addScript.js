// @flow strict
const addScript = (url: string) => {
  if (typeof window === "undefined") return;
  const f = document.createElement("script");
  f.type = "text/javascript";
  f.async = true;
  f.src = url.replace(/^https?:/, "");
  const head = document.head || document.getElementsByTagName("head")[0];
  head.appendChild(f);
};

export default addScript;
