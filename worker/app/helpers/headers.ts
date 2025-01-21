export const extractVisitorHeaders = (headers: Headers): VisitedHeaders => {
  const result: VisitedHeaders = {};

  const keys: (keyof VisitedHeaders)[] = [
    "city",
    "country",
    "continent",
    "longitude",
    "latitude",
    "region",
    "regionCode",
    "metroCode",
    "postalCode",
    "timezone",
  ];

  for (const key of keys) {
    result[key] = headers.get(key)?.toString() ?? undefined;
  }

  return result;
};

export type VisitedHeaders = {
  city?: string | undefined;
  country?: string | undefined;
  continent?: string | undefined;
  longitude?: string | undefined;
  latitude?: string | undefined;
  region?: string | undefined;
  regionCode?: string | undefined;
  metroCode?: string | undefined;
  postalCode?: string | undefined;
  timezone?: string | undefined;
};
