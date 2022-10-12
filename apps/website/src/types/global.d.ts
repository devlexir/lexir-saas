import "little-state-machine";

declare module "little-state-machine" {
  interface GlobalState {
    onboardingInfo: {
      brand_name?: string,
      brand_based?: string
      brand_market?: any
      brand_website?: any
      brand_website_url?: string
      bottles_annually?: any
      market_begin?: any
      type_spirit?: any
      type_wine?: any
    };
  }
}