export const USER_STATUS = {
  ACTIVATED: 1,
  DELETED: 2,
  AWATING_EMAIL_CONFIRMATION: 3,
  BLOCKED: 4,
} as const;

export const CALENDAR_STATUS = {
  CREATING: 1,
  ORDED_SHIPPED: 2,
  PAID: 3,
  IN_SHIPPING: 4,
  DELIVERED: 5,
} as const;

export const COMMON_FOLDER = __dirname + '/../../../common';
