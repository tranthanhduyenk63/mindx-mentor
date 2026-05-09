import DepositOrderModel from "../models/depositOrder.model.js";

const DepositOrderController = {
  getDepositOrders: async (req, res) => {
    const { customer, page = 1, pageSize = 10, sortBy, sortOrder } = req.query;

    const filter = {};
    if (customer) filter.customerId = customer;

    const totalItems = await DepositOrderModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (page - 1) * pageSize;

    const sort = sortOrder === "asc" ? 1 : -1;
    const items = await DepositOrderModel.find(filter)
      .sort({ [sortBy]: sort })
      .skip(skip)
      .limit(pageSize)
      .populate("customerId", "name email phone");

    return res.send({
      items,
      totalItems,
      totalPages,
      page,
      pageSize,
    });
  },
};

export default DepositOrderController;
