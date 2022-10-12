import slugify from "slugify";

export function slugifyBrand(brand_name: string) {
  return slugify(brand_name, {
    replacement: "-",
    remove: undefined,
    lower: true,
    strict: false,
    locale: "vi",
    trim: true,
  });
}
