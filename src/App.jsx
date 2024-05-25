import React, { useState, useRef } from 'react';
import './App.css';

function Seat({ number, available, selected }) {
  const classNames = `seat ${available ? 'available' : 'unavailable'}`;
  return <div className={classNames}>{number}</div>;
}

function App() {
  const [seats, setSeats] = useState(Array(80).fill({ available: true, selected: false }));
  const [numSeatsToReserve, setNumSeatsToReserve] = useState(null);
  const seatsAvailableCount = useRef(80);

  const reserveSeats = () => {
    if(numSeatsToReserve == null || numSeatsToReserve == 0){
      alert("Please inter any number between 1 to 7 to reserve the seat.")
      return;
    }
    let remainingSeatsToReserve = numSeatsToReserve;
    if(seatsAvailableCount.current < numSeatsToReserve){
      alert(`There is only ${seatsAvailableCount.current} seats left in this coach.....`)
      return;
    }
    const seatsvalue = [...seats];

    for (let i = 0; i < seats.length; i++) {
      if (seatsvalue[i].available) {
          seatsvalue[i] = {selected: true, available: false};
          remainingSeatsToReserve--;
      }
      if (remainingSeatsToReserve == 0) {
        break; // Exit loop if all seats are reserved
      }
    }

    if (remainingSeatsToReserve == 0) {
      alert(`You have successfullly bokked ${numSeatsToReserve} seats`);
    }

    seatsAvailableCount.current = seatsAvailableCount.current - numSeatsToReserve;
    setSeats([...seatsvalue]);
    setNumSeatsToReserve(null);
  };

  const handleChangeNumSeats = event => {
    const numSeats = parseInt(event.target.value);
    if(numSeats > 7){
      alert("You can reserve only 7 seats at a time");
      return;
    }
    setNumSeatsToReserve(numSeats);
  };

  return (
    <div className="coach">
      <h1>Book Your Ticket</h1>
      <div className='inputClass'>
        <label htmlFor="numSeats">Number of Seats to Reserve:</label>
        <input type="number" id="numSeats" name="numSeats" value={numSeatsToReserve} onChange={handleChangeNumSeats} />
      </div>
      <button onClick={reserveSeats}>Reserve Seats</button>
      <div className="seats">
        {seats.map((seat, index) => (
          <Seat
            key={index}
            number={index + 1}
            available={seat.available}
            selected={seat.selected}
          />
        ))}
      </div>

      <div>
        {seatsAvailableCount.current === 0 && (
          <h2>There is no seats available. All seats have been reserved.</h2>
        )}
      </div>
    </div>
  );
}

export default App;