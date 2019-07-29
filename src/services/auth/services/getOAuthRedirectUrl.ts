export default function getOAuthRedirectUrl(url: string) {
  const safeUrl = url
    // Because oauth redirect is done on server we need get rid of hash
    .split("#")[0]
    // Remove tracking parameters
    .replace(/((utm_[a-z]+)|(session_[a-z]+))=[^&]*(&|$)/g, )
    // Remove trailing delimiters
    .replace(/(&|\?)+$/, )
    // Escape special characters
    .replace(/,/g, "%2C")
    .replace(/~/g, "%7E");

  return `${safeUrl}${safeUrl.includes("?") ? "&" : "?"}oauth-login=true`;
}
