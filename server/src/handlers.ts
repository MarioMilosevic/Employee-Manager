import prisma from "./db";

export const createEmployee = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const newEmployee = await prisma.employee.create({
      data,
    });
    console.log("new employee", newEmployee);
    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.log("Error creating employee", error);
    res.status(500).json({
      success: false,
      message: "Failed to create employee",
      error: error.message,
    });
  }

  // const employee = await prisma.user.create({
  //     data
  // })
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    console.log(employees);
    res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    console.log("Error fetching employees", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch employees",
      error: error.message,
    });
  }
};
