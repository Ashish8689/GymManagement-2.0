export enum ClientErrors {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
}

export enum SettledStatus {
    FULFILLED = 'fulfilled',
    REJECTED = 'rejected',
}
