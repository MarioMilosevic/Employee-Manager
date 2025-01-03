import prisma from "../../src/db";

const employee = {
  async create(req, res) {
    try {
      const data = req.body;
      const newEmployee = await prisma.employee.create({
        data,
      });
    } catch (error) {
      // neka funkcija ako je error
    }
  },
  async getAll(req, res) {
    try {
      const employees = await prisma.employee.findMany();
      //    res.status(200).json({
      //      success: true,
      //      data: employees,
      //    });
    } catch (error) {
      //    res.status(500).json({
      //      success: false,
      //      message: "Failed to fetch employees",
      //      error: error.message,
      //    });
    }
  },
  async getSingle(req, res) {
    try {
      const { id } = req.params;
      const employee = await prisma.employee.findUnique({
        where: { id },
      });
      // res.status(200).json({
      //   success: true,
      //   data: employee,
      // });
    } catch (error) {
      // res
      //   .status(500)
      //   .json({ success: false, error: "Failed to fetch employee" });
    }
    },
    async delete(req, res) {
        try {
          const { id } = req.params;
          const deletedEmployee = await prisma.employee.delete({
            where: { id },
          });
        //   res.status(200).json({
        //     message: "Employee deleted successfully",
        //     data: deletedEmployee,
        //   });
        } catch (error) {
        //   res.status(500).json({ error: "Failed to delete employee" });
        }
    },
    async edit(req, res) {
          try {
            const { id } = req.params;
            const data = req.body;

            const updatedEmployee = await prisma.employee.update({
              where: { id },
              data,
            });
            // res.status(200).json({
            //   success: true,
            //   data: updatedEmployee,
            // });
          } catch (error) {
            // res
            //   .status(500)
            //   .json({ success: false, error: "Failed to edit employee" });
          }
    }
};

export default employee