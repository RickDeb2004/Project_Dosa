export const mockQueries = [
    {
      id: 1,
      query: "SELECT * FROM internetData;",
      result: [
        { id: 1, first_name: "John", last_name: "Doe", email: "john.doe@example.com" },
        { id: 2, first_name: "Jane", last_name: "Smith", email: "jane.smith@example.com" },
        { id: 3, first_name: "Alice", last_name: "Johnson", email: "alice.j@example.com" },
        { id: 4, first_name: "Bob", last_name: "Brown", email: "bob.brown@example.com" },
        { id: 5, first_name: "Charlie", last_name: "Davis", email: "charlie.d@example.com" },
        { id: 6, first_name: "Diana", last_name: "Miller", email: "diana.m@example.com" },
        { id: 7, first_name: "Edward", last_name: "Wilson", email: "edward.w@example.com" },
        { id: 8, first_name: "Fiona", last_name: "Moore", email: "fiona.m@example.com" },
      ],
    },
    {
      id: 2,
      query: "SELECT id, first_name, last_name, email FROM internetData;",
      result: [
        { id: 9, first_name: "George", last_name: "Clark", email: "george.c@example.com" },
        { id: 10, first_name: "Hannah", last_name: "White", email: "hannah.w@example.com" },
        { id: 11, first_name: "Ian", last_name: "Hall", email: "ian.h@example.com" },
        { id: 12, first_name: "Julia", last_name: "Allen", email: "julia.a@example.com" },
      ],
    },
    {
      id: 3,
      query: "SELECT first_name, email FROM internetData WHERE id < 6;",
      result: [
        { first_name: "John", email: "john.doe@example.com" },
        { first_name: "Jane", email: "jane.smith@example.com" },
        { first_name: "Alice", email: "alice.j@example.com" },
        { first_name: "Bob", email: "bob.brown@example.com" },
        { first_name: "Charlie", email: "charlie.d@example.com" },
      ],
    },
  ];
  
  export const initialQuery = "SELECT * FROM internetData;";
  