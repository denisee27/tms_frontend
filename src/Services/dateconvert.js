import moment from "moment";

export const toYMD = (dateString) => {
    return moment(dateString).format("YYYY-MM-DD");
};
