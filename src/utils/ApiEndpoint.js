import { config } from "../configs/config";

export const BASE_URL      = config.apis.base_url;

// Login
export const AUTH__LOGIN   = BASE_URL + "/login";

// Event
export const EVENT__GET_LIST = BASE_URL + "/event/type/";
export const EVENT__GET_LIST_PENDING = BASE_URL + "/event/pending/";
export const EVENT__APPROVE = BASE_URL + "/event/approve/";
export const EVENT__REJECT = BASE_URL + "/event/reject/";

export const EVENT__JOIN = BASE_URL + "/event/";

//Account
export const ACCOUNT__GET_PROFILE = BASE_URL + "/account/";
export const ACCOUNT__GET_ALL_ACCOUNT = BASE_URL + "/account";
export const ACCOUNT__UPDATE_PROFILE = BASE_URL + "/account/";


//Attendance
export const ATTENDANCE__TAKE_ATTENDANCE = BASE_URL + "/attendance/take";

//Detail
export const DETAIL__CREATE_DETAIL = BASE_URL + "/detail/";
export const DETAIL__GET_ALL_DETAIL = BASE_URL + "/detail/all/";
export const DETAIL__GET_LIST_ATTENDANCE = BASE_URL + "/detail/";








