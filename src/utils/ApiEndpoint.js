import { config } from "../config";

export const BASE_URL      = config.apis.base_url;
export const AUTH_BASE_URL = BASE_URL + "/auth";
export const API_BASE_URL  = BASE_URL + "/api/v1";

// Authentication
export const AUTH__LOGIN   = BASE_URL + "/login";
export const AUTH__SIGN_UP = AUTH_BASE_URL + "/signup";

// AdminCP
export const ADMINCP__GET_CONFESS     = API_BASE_URL + "/admincp/confessions";
export const ADMINCP__APPROVE_CONFESS = 
    API_BASE_URL + "/admincp/confessions/approve";
export const ADMINCP__REJECT_CONFESS = 
    API_BASE_URL + "/admincp/confessions/reject";

// Guest
export const GUEST__POST_CONFESS   = API_BASE_URL + "/confessions";
export const GUEST__GET_MY_CONFESS = API_BASE_URL + "/myconfess";
export const GUEST__GET_OVERVIEW   = API_BASE_URL + "/confessions/overview";

// Event
export const EVENT_GET_ALL = BASE_URL + "/event";
export const EVENT_PENDING = BASE_URL + "/event/pending/";
export const EVENT_APPROVE = BASE_URL + "/event/approve/";
export const EVENT_REJECT = BASE_URL + "/event/reject/";