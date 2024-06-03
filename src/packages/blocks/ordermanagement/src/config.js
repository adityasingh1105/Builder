Object.defineProperty(exports, "__esModule", {
  value: true,
});

// Customizable Area Start
exports.apiContentType = "application/json";
exports.loginAlertMsg = "Please login first";
exports.listOfOrdersEndPoints = "order_management/orders";
exports.listOfOrdersMethod = "GET";
exports.createOrderEndPoint = "order_management/orders";
exports.createOrderItemInOrderEndPoint = "order_management/orders/:id/add_order_items";
exports.createOrderMethod = "POST";
exports.getOrderByIdEndPoint = "order_management/orders/:id";
exports.getOrderByIdMethod = "GET";
exports.deleteOrderItemEndPoint = "order_management/orders/:id/remove_order_items";
exports.deleteOrderItemMethod = "DELETE";
exports.appplyCouponCodeEndpoint = "order_management/orders/:id/apply_coupon";
exports.appplyCouponCodeMethod = "POST";
exports.getAddressListEndPoint = "order_management/addresses";
exports.getAddressListMethod = "GET";
exports.createAddressEntPoint = "order_management/addresses";
exports.createAddressMethod = "POST";
exports.addAddressToAddressEndPoint = "order_management/orders/:id/add_address_to_order";
exports.addAddressToAddressMethod = "PUT";
exports.deleteOrderEndPoint = "order_management/orders/:id";
exports.deleteOrderMethod = "DELETE";
exports.cencelOrderEndPoint = "order_management/orders/:id/cancel_order";
exports.cencelOrderMethod = "PUT";
exports.orderCreatedAlertMsg = "You order is created successfully!";
exports.orderNumberText = "Order Number";
exports.quantityText = "Quantity";
exports.orderedOnText = "Ordered On";
exports.cancelOrderText = "Cancel Order";
exports.deleteOrderText = "Delete Order";
exports.cancelledText = "Cancelled";
exports.descriptionText = "Description: ";
exports.categoryText = "Category: ";
exports.createNewOrderText = "Create New Order"
exports.createNewOrderItemText = "Create New Order Item"
exports.addNewOrderItem = "Add New Order Item";
exports.viewDetailBtn = "View Details";
exports.loadingText = "Loading...";
exports.cancelBtnLabel = "Cancel";
exports.createBtnLabel = "Create";
exports.deleteItemBtnLabel = "Delete this item";
exports.currencySymbole = "$";
exports.subTotalText = "Sub total";
exports.shippingChargeText = "Shipping Charges";
exports.totalTaxText = "Total Tax";
exports.discountText = "Discount";
exports.totalText = "Total";
exports.couponCodePlaceholder = "Please enter coupon code";
exports.applyBtnLabel = "Apply";
exports.addressLabel = "Address:";
exports.selectAddress = "Select Add";
exports.changeAddress = "Change Add";
exports.addressNameLabel = "Name";
exports.addressTypeLabel = "Address Type";
exports.flatNoLabel = "Flat no.";
exports.landmarkLabel = "Landmark";
exports.addressLabel = "Address";
exports.addressLine2Label = "Address Line 2";
exports.cityLabel = "City";
exports.stateLabel = "State";
exports.countryLabel = "Country";
exports.zipcodeLabel = "Zipcode";
exports.createNewAddressText = "Create New Address";
exports.addressTypePlaceholder = "Please enter address type*";
exports.namePlaceholder = "Please enter address name*";
exports.flatNoPlaceholder = "Please enter flat no.*";
exports.zipCodePlaceholder = "Please enter zipcode*";
exports.addressPlaceholder = "Please enter address*";
exports.addressLine2Placeholder = "Please enter address line 2";
exports.landmarkPlaceholder = "Please enter landmark";
exports.cityPlaceholder = "Please enter city";
exports.statePlaceholder = "Please enter state";
exports.countryPlaceholder = "Please enter country";
exports.phoneNoPlaceholder = "Please enter phone no*";
exports.selectThisAddressBtn = "Select this address";
exports.addressNavigationAlert = "Order ID not present";
exports.emptyOrderListMsg = "Order list is empty";
exports.catalogueIdPlaceholder = "Please enter catalogue id";
exports.catalogueVariantIdPlaceholder = "Please enter catalogue variant id";
exports.quantityPlaceholder = "Please enter quantity";
exports.createNewOrderTitle = "Create New Order";
exports.orderManagementLabel = "Order Management";
// Customizable Area End