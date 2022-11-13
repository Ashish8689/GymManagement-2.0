const endOfDay = require("date-fns/endOfDay");
const parse = require("date-fns/parse");
const startOfToday = require("date-fns/startOfToday");
const addDays = require("date-fns/addDays");

const endDateGenerator = (date) => {
    return endOfDay(parse(date, "dd/MM/yyyy", new Date()));
};

const currentEndDate = startOfToday();

// return date having +6 day from today;
const futureEndDate = addDays(new Date(), 6);

module.exports = {
    endDateGenerator,
    currentEndDate,
    futureEndDate,
};
