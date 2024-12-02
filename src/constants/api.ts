// Auth
export const LOGIN_API = "admin/auths/login";
export const CHANGE_PASSWORD_API = "admin/auths/reset-password";
export const SEND_RESET_PASSWORD_EMAIL_API = "admin/auths/forgot-password";
export const SEND_RESET_PASSWORD_OTP_API = "user/otps/send";
export const CONFIRM_RESET_PASSWORD_OTP_API = "user/otps/confirm";

// Users
export const USERS_API = "admin/users";

// Banks
export const GET_BANK_LIST_API = "admin/operations/bank-lists";
export const GET_FEE_BANK_LOGS_API = "admin/operations/fee-banks";

// Roles
export const GET_ROLE_LISTS_API = "admin/operations/role-lists";
export const CREATE_ROLE_API = "admin/operations/roles";
export const GET_ROLES_API = "admin/operations/roles";

// Admins
export const CREATE_ADMIN_API = "admin/accounts";
export const GET_ADMIN_PROFILE_API = "admin/accounts/profile";
export const UPLOAD_PROFILE_PHOTO_API = "admin/files/profile-picture";
export const GET_ACTIVITY_LOGS_API = "admin/accounts/activity-log";

// Charge Stations
export const GET_CHARGE_STATIONS_API = "admin/vehicles/charge-stations";
export const BULK_UPLOAD_CHARGE_STATIONS_API =
  "admin/vehicles/bulk-charge-station-upload";

// Drivers
export const CREATE_DRIVER_API = "admin/users/drivers";
export const BULK_UPLOAD_DRIVERS_API = "admin/users/bulk-driver-upload";
export const UPDATE_DRIVER_STATUS_API = "admin/users/account-status";

// Riders
export const GET_RIDERS_API = "admin/users/riders";

// Service Requests
export const GET_SERVICE_REQUESTS_API = "admin/maintenance/service-request";

// Notification
export const GET_NOTIFICATIONS_API = "admin/messages/notification";

// OEMs
export const UPLOAD_OEM_VEHICLE_PHOTO_API = "admin/files/oem-model-picture";
export const GET_OEM_API = "admin/vehicles/oem";

// Vehicles
export const GET_VEHICLES_API = "admin/vehicles";
export const ASSIGN_VEHICLES_API = "admin/vehicles/assign";
export const REVOKE_VEHICLE_API = "admin/vehicles/revoke";
export const BULK_UPLOAD_VEHICLES_API = "admin/vehicles/bulk-vehicle-upload";

// Organizations
export const GET_ORGANIZATIONS_API = "admin/organizations";
export const SUSPEND_ORGANIZATION_API = "admin/organizations/suspend-account";

// Payments
export const GET_LEASE_SERVICE_PAYMENT_API =
  "admin/payments/service-payment-lease";
export const GET_COMMUTE_SERVICE_PAYMENT_API =
  "admin/payments/service-payment-staffcommute";
export const GET_RECONCILIATION_API = "admin/payments/reconciliation-split";
export const GET_PAYOUTS_API = "admin/payments/payout";

// Fees
export const GET_FEES_API = "admin/operations/fees";

// Trips
export const GET_TRIPS_API = "admin/trips";
export const GET_TRIP_DATA_STATS_API = "admin/trips/data-stats";
export const GET_RANKS_API = "admin/trips/top-ranks";

// Ratings
export const GET_RATINGS_API = "admin/trips/ratings";

// Wallet
export const GET_WALLET_STATS_API = "admin/wallets/wallet-stats";
export const GET_WALLET_TRANSACTION_API = "admin/wallets/wallet-transaction";

// Other
export const GET_INDUSTRIES_API = "industries";

// Country
export const COUNTRY_API = "countries";
