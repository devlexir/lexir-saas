import { atom } from "jotai";

// ** Orders Filters ** //
export const orderIdFilterOrderAtom = atom("");
export const customerFilterOrderAtom = atom("");
export const customerTypeFilterOrderAtom = atom("");
export const orderValueMinFilterOrderAtom = atom("");
export const orderValueMaxFilterOrderAtom = atom("");
export const orderDateStartFilterOrderAtom = atom("");
export const orderDateEndFilterOrderAtom = atom("");

// ** Brands Filters **//
export const brandFilterBrandsAtom = atom("");
export const originFilterBrandsAtom = atom("");
export const accountyTypeFilterBrandsAtom = atom("");
export const dateOnboardedFilterBrandsAtom = atom("");
export const saltesToDateFilterBrandsAtom = atom("");
export const contactFilterBrandsAtom = atom("");

// ** Customers Filters **//
export const customerFilterCustomersAtom = atom("");
export const cityFilterCustomersAtom = atom("");
export const customerTypeFilterCustomersAtom = atom("");
export const latestOrderFilterCustomersAtom = atom("");
export const salesToDateCustomersAtom = atom("");
export const contactFilterCustomersAtom = atom("");

// ** Sotcks Filters **//
export const productNameFilterStocksAtom = atom("");
export const availableStockMinFilterStocksAtom = atom("");
export const availableStockMaxFilterStocksAtom = atom("");

// ** Products Filters **//
export const brandFilterProductsAtom = atom("");
export const productNameFilterProductsAtom = atom("");
export const skuFilterProductsAtom = atom("");
export const categoryFilterProductsAtom = atom("");
export const sizeFilterProductsAtom = atom("");
export const abvFilterProductsAtom = atom("");
export const alcoholTaxesFilterProductsAtom = atom("");
export const b2cPriceFilterProductsAtom = atom("");
export const b2bPriceFilterProductsAtom = atom("");
