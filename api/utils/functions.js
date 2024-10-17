import { constants } from "./constants.js";

export function checkEmailDomain(email) {
    if (email.endsWith('@calten.mx')) {
        return 0.1;
    } else {
        return constants.ticketPrice;
    }
}