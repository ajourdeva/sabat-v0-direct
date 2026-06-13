import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = requestLocale;

  // Check if locale is valid, fallback to default if not
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    messages: (
      await import(`./messages/${locale}.json`)
    ).default,
  };
});
