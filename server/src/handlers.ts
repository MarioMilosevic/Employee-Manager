import prisma from "./db";

export const createEmployee = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    // const employee = employee.createEmployee()
    // services folder => employee folder => index.ts 
    // 1 folder error factory (isto u serivces) => index.ts export 1 objekat default => handleBadRequest handleNotAuthorized hanldeNotFound internalError
    // pomocna funkcija koja rjesava res.status 54654654
    // try catch
    // neki api koji exporta success responsove created deleted edited 
    
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
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
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

export const getEmployee = async (req, res) => {
  try {
      const { id } = req.params;
    const employee = await prisma.employee.findUnique({
      where: { id },
    });
    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    console.error("Error fetching single employee", error);
    res.status(500).json({ success: false, error: "Failed to fetch employee" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await prisma.employee.delete({
      where: { id },
    });
    res.status(200).json({
      message: "Employee deleted successfully",
      data: deletedEmployee,
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Failed to delete employee" });
  }
};

export const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body; 

    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data, 
    });

    console.log('apdejtovani ', updatedEmployee)

    // Send back the updated employee as a response
    res.status(200).json({
      success: true,
      data: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ success: false, error: "Failed to edit employee" });
  }
};
