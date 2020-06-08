function generateTimeSlots(startTime, endTime, timeSlot, schedules) {

    var startTime =  new Date(startTime);
    var endTime =  new Date(endTime);
    var res = [];
    var sched;
    while(startTime.getTime() < endTime.getTime()){
        startTime = new Date(startTime.getTime()+timeSlot*60000);
        res.push(startTime);
}
sched = schedules.map(x => new Date(x.start_timestamp).getTime());
return removeUsedSlots(res,sched);
};

function removeUsedSlots(allSlots,usedSlots){
    const difference = allSlots.filter(x => !usedSlots.includes(x.getTime()));
    return difference;
}

module.exports = {
    generateTimeSlots: generateTimeSlots,
 };