import { config } from "../configs/config";

export const BASE_URL      = config.apis.base_url;
export const AUTH_BASE_URL = BASE_URL + "/auth";
export const API_BASE_URL  = BASE_URL + "/api/v1";

// Authentication
export const AUTH__LOGIN   = BASE_URL + "/login";
export const AUTH__SIGN_UP = AUTH_BASE_URL + "/signup";

// Event
export const EVENT_GET__BY_TYPE = BASE_URL + "/event/type/";
export const EVENT_PENDING = BASE_URL + "/event/pending/";
export const EVENT_APPROVE = BASE_URL + "/event/approve/";
export const EVENT_REJECT = BASE_URL + "/event/reject/";
export const EVENT_JOIN = BASE_URL + "/event/";
export const EVENT_CREATE_DETAIL = BASE_URL + "/detail/";
export const EVENT_GET_DETAIL_BY_ID = BASE_URL + "/detail/all/";
export const EVENT_GET_ALL_ACCOUNT = BASE_URL + "/account";
export const EVENT_GET_STUDENTS_ATTENDANCE = BASE_URL + "/detail/";

//Account
export const ACCOUNT_GET_PROFILE = BASE_URL + "/account/";






