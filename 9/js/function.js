const getMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);

  return hours * 60 + minutes;
};

const isMeetingWithinWorkday = (startDay, endDay, startTime, duration) => {
  const startDayMinutes = getMinutes(startDay);
  const endDayMinutes = getMinutes(endDay);
  const startMeetingMinutes = getMinutes(startTime);
  const endMeetingMinutes = startMeetingMinutes + duration;

  return startMeetingMinutes >= startDayMinutes &&
    endMeetingMinutes <= endDayMinutes;
};
//console.log(isMeetingWithinWorkday('08:00', '17:30', '14:00', 90)); // true
//console.log(isMeetingWithinWorkday('8:0', '10:0', '8:0', 120));     // true
//console.log(isMeetingWithinWorkday('08:00', '14:30', '14:00', 90)); // false
//console.log(isMeetingWithinWorkday('14:00', '17:30', '08:0', 90));  // false
//console.log(isMeetingWithinWorkday('8:00', '17:30', '08:00', 900)); // false
isMeetingWithinWorkday('08:00', '17:30', '14:00', 90);
