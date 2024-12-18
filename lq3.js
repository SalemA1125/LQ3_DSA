class Bus {
  constructor(destination, capacity = 30) {
    this.destination = destination;
    this.seats = Array(capacity).fill(null); // Initialize seats with null
  }
}

class TicketPerson {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

// Sample Ticket Person data (replace with actual user data)
const ticketPersons = [
  new TicketPerson("admin", "password123"),
  new TicketPerson("user1", "pass1234"),
];

function authenticateTicketPerson(username, password) {
  return ticketPersons.some(
    (person) => person.username === username && person.password === password
  );
}

function viewBusPassengers(bus) {
  console.log(`Bus Destination: ${bus.destination}`);
  bus.seats.forEach((seat, index) => {
    console.log(`Seat No.: ${index + 1}, Customer Name: ${seat || "AVAILABLE"}`);
  });
}

function manageBus(bus) {
  while (true) {
    console.log("\nBus Management Options:");
    console.log("1. Add Reservation");
    console.log("2. Remove Reservation");
    console.log("3. Cancel");
    const choice = prompt("Enter your choice:");

    if (choice === "1") {
      while (true) {
        const seatNo = parseInt(prompt("Enter seat number to add reservation:")) - 1;
        if (isNaN(seatNo) || seatNo < 0 || seatNo >= bus.seats.length) {
          console.log("Invalid seat number.");
          continue;
        }
        if (bus.seats[seatNo] === null) {
          const customerName = prompt("Enter customer name:");
          bus.seats[seatNo] = customerName;
          console.log("Reservation added successfully.");
        } else {
          console.log("Seat is already occupied.");
        }
        if (
          !confirm("Add another reservation? (OK for Yes, Cancel for No)")
        ) {
          break;
        }
      }
    } else if (choice === "2") {
      while (true) {
        const seatNo = parseInt(prompt("Enter seat number to remove reservation:")) - 1;
        if (isNaN(seatNo) || seatNo < 0 || seatNo >= bus.seats.length) {
          console.log("Invalid seat number.");
          continue;
        }
        if (bus.seats[seatNo]) {
          bus.seats[seatNo] = null;
          console.log("Reservation removed successfully.");
        } else {
          console.log("Seat is already empty.");
        }
        if (
          !confirm("Remove another reservation? (OK for Yes, Cancel for No)")
        ) {
          break;
        }
      }
    } else if (choice === "3") {
      break;
    } else {
      console.log("Invalid choice.");
    }
  }
}

// Define buses
const buses = [
  new Bus("Cubao"),
  new Bus("Baguio"),
  new Bus("Pasay"),
];

while (true) {
  console.log("\nWelcome to Bus Reservation System");
  console.log("1. Ticket Person");
  console.log("2. Customer");
  console.log("3. Exit");
  const userChoice = prompt("Enter your choice:");

  if (userChoice === "1") {
    const username = prompt("Enter username:");
    const password = prompt("Enter password:");

    if (authenticateTicketPerson(username, password)) {
      while (true) {
        console.log("\nTicket Person Menu");
        console.log("1. View Buses");
        console.log("2. Manage Bus");
        console.log("3. Logout");
        const ticketPersonChoice = prompt("Enter your choice:");

        if (ticketPersonChoice === "1") {
          buses.forEach((bus, index) => {
            console.log(`\nBus ${index + 1}:`);
            viewBusPassengers(bus);
          });
          prompt("Press Enter to continue...");
        } else if (ticketPersonChoice === "2") {
          const busIndex =
            parseInt(prompt("Enter bus number to manage (1-3):")) - 1;
          if (busIndex >= 0 && busIndex < buses.length) {
            manageBus(buses[busIndex]);
          } else {
            console.log("Invalid bus number.");
          }
        } else if (ticketPersonChoice === "3") {
          break;
        } else {
          console.log("Invalid choice.");
        }
      }
    } else {
      console.log("Invalid username or password.");
    }
  } else if (userChoice === "2") {
    while (true) {
      console.log("\nCustomer Menu");
      console.log("1. Reserve Seat");
      console.log("2. Cancel Reservation");
      console.log("3. Cancel");
      const customerChoice = prompt("Enter your choice:");

      if (customerChoice === "1") {
        console.log("\nAvailable Buses:");
        buses.forEach((bus, index) => {
          console.log(`${index + 1}. ${bus.destination}`);
        });
        const busIndex = parseInt(prompt("Enter bus number:")) - 1;
        if (busIndex >= 0 && busIndex < buses.length) {
          const bus = buses[busIndex];
          const availableSeats = bus.seats
            .map((seat, index) => (seat === null ? index + 1 : null))
            .filter(Boolean);
          if (availableSeats.length > 0) {
            console.log("\nAvailable Seats:", availableSeats);
            const seatNo = parseInt(prompt("Enter seat number:")) - 1;
