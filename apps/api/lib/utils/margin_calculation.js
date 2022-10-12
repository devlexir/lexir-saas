function margin_calculation() {
  // let plan = "essential";
  let plan = "grandfather";

  // LOGISTICS CALCULATION

  // STOCK ONBOARDING

  let number_pallets = 1;
  let number_sku_pallet = 6;
  let cost_sku_per_pallet = 1.5;
  // Number of bootles in the order
  let order_size_bottles = 12;
  let lexir_orders_per_month_from_france = 20;

  let total_cost_all_sku_all_pallets =
    number_pallets * number_sku_pallet * cost_sku_per_pallet;

  let fixed_reception_fee = 2.75;
  let number_bottles_per_pallet = 500;

  // stock_onboarding_cost = 10.25
  let stock_onboarding_cost =
    total_cost_all_sku_all_pallets + fixed_reception_fee;

  let total_onboarding_bottles = number_bottles_per_pallet * number_pallets;

  let bottle_onboarding_cost = stock_onboarding_cost / total_onboarding_bottles;

  console.log("STOCK ONBOARDING");
  console.log(`Stock Onboarding Cost: ${stock_onboarding_cost}`);
  console.log(`Bottle Onboarding Cost: ${bottle_onboarding_cost}`);

  // STORAGE
  let cost_per_pallet_per_day = 0.35;
  let cost_per_pallet_per_month = (cost_per_pallet_per_day * 365) / 12;
  let average_product_storage_cycle_months = 6;

  let bottle_storage_cost_monthly =
    cost_per_pallet_per_month / number_bottles_per_pallet;

  let total_bottle_storage_cost =
    average_product_storage_cycle_months * bottle_storage_cost_monthly;

  console.log("STORAGE");
  console.log(`Cost Per Pallet per month: ${cost_per_pallet_per_month}`);
  console.log(`Total Bottle Storage Cost: ${total_bottle_storage_cost}`);

  // Picking & Packing
  var fixed_fee_per_order;

  if (lexir_orders_per_month_from_france <= 250) {
    fixed_fee_per_order = 1.25;
  } else if (lexir_orders_per_month_from_france <= 500) {
    fixed_fee_per_order = 1.2;
  } else if (lexir_orders_per_month_from_france <= 1000) {
    fixed_fee_per_order = 1.15;
  } else if (lexir_orders_per_month_from_france > 1000) {
    fixed_fee_per_order = 1.1;
  }

  var shipping_per_unit;

  if (lexir_orders_per_month_from_france <= 250) {
    shipping_per_unit = 0.15;
  } else if (lexir_orders_per_month_from_france <= 500) {
    shipping_per_unit = 0.15;
  } else if (lexir_orders_per_month_from_france <= 1000) {
    shipping_per_unit = 0.12;
  } else if (lexir_orders_per_month_from_france > 1000) {
    shipping_per_unit = 0.12;
  }

  let order_processing =
    fixed_fee_per_order + order_size_bottles * shipping_per_unit;

  let bottle_processing_cost = order_processing / order_size_bottles;

  console.log("Picking & Packing");
  console.log(`Order Processing: ${order_processing}`);
  console.log(`Bottle Processing Cost: ${bottle_processing_cost}`);

  // Last Mile

  let last_mile_cost_per_order = 12;

  let bootle_last_mile_cost = last_mile_cost_per_order / order_size_bottles;

  console.log("Last Mile");
  console.log(`Bottle Last Mile Cost: ${bootle_last_mile_cost}`);

  let total_logistics_cost;

  let safety_margin = 0.5;

  if (plan === "grandfather") {
    total_logistics_cost =
      bottle_onboarding_cost +
      total_bottle_storage_cost +
      bottle_processing_cost +
      bootle_last_mile_cost +
      safety_margin;
  } else {
    total_logistics_cost =
      bottle_processing_cost + bootle_last_mile_cost + safety_margin;
  }

  console.log("Total Logistics Cost");
  console.log(`Total Logistics Cost: ${total_logistics_cost}`);

  // MARGIN CALCULATION

  let bottle_sales_price = 27.5;
  let excise_and_duty = 4.75262;
  let payment_processing = 0.25 + bottle_sales_price * 0.015;
  let sales_rep_commission_rate = 0.1;

  let sales_net_logistics_and_taxes =
    bottle_sales_price -
    total_logistics_cost -
    excise_and_duty -
    payment_processing;

  let sales_rep_commission =
    sales_rep_commission_rate * sales_net_logistics_and_taxes;

  let available_margin = sales_net_logistics_and_taxes - sales_rep_commission;

  let lexir_commission_rate;

  if (plan === "grandfather") {
    lexir_commission_rate = 0.25;
  } else {
    lexir_commission_rate = 0.12;
  }

  let lexir_commission = available_margin * lexir_commission_rate;

  let brand_margin = available_margin - lexir_commission;

  console.log("Margin Calculation");
  console.log(`Payment Processing: ${payment_processing}`);
  console.log(
    `Sales Net Logistics and Taxes: ${sales_net_logistics_and_taxes}`
  );
  console.log(`Sales Rep Commission: ${sales_rep_commission}`);
  console.log(`Available Margin: ${available_margin}`);

  console.log(`Lexir Commission: ${lexir_commission}`);
  console.log(`Brand Margin: ${brand_margin}`);
}

margin_calculation();
