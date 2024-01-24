import React from "react";

const getFridayDate = (date: any) => {
  const dayOfWeek = date.getDay();
  const fridayOffset = dayOfWeek === 0 ? 2 : dayOfWeek === 6 ? 1 : 0;
  const fridayDate = new Date(date);
  fridayDate.setDate(fridayDate.getDate() - fridayOffset);
  return fridayDate;
};

const MyComponent = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (event: { target: { value: string | number | Date } }) => {
    setSelectedDate(new Date(event.target.value));
  };

  const fridayDate = getFridayDate(selectedDate);

  return (
    <div>
      <input
        type="date"
        value={selectedDate.toISOString().split("T")[0]}
        onChange={handleDateChange}
      />
      <p>Selected Date: {selectedDate.toDateString()}</p>
      {fridayDate.getDay() === 5 && <p>Friday Date: {fridayDate.toDateString()}</p>}
    </div>
  );
};

export default MyComponent;
