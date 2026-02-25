export function getT(dictionary: any) {
  return function t(key: string, params?: Record<string, string | number>) {
    const keys = key.split(".")
    let value = dictionary

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        console.warn(`Translation key not found: ${key}`)
        return key
      }
    }

    if (typeof value !== "string") {
      console.warn(`Translation key does not resolve to a string: ${key}`)
      return key
    }

    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        value = (value as string).replace(`{${k}}`, String(v))
      })
    }

    return value as string
  }
}
