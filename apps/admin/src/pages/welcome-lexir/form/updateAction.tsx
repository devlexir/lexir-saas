import { GlobalState } from 'react-hook-form'

export default function updateAction(
  state: GlobalState,
  payload: {
    formDetail: {
      brand_name?: string
      brand_based?: string
      brand_market?: any
      brand_website?: any
      brand_website_url?: string
      bottles_annually?: any
      market_begin?: any
      type_spirit?: any
      type_wine?: any
    }
  }
): GlobalState {
  return {
    ...state,
    ...payload,
  }
}
