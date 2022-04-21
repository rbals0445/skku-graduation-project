import { REGEXP_VALID_ID } from "./regexp";
// ID가 유효한지 검사
export const isValidId = (id) => REGEXP_VALID_ID.test(id);
