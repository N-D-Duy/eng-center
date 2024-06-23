const controller = require('../../controllers');

module.exports = (app) => {
    /**
     * @swagger
     * /api/payment/total-paid/{id}:
     *   get:
     *     summary: Get total payment made by a parent
     *     tags: [Payments]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: Parent ID
     *     responses:
     *       200:
     *         description: Total amount paid by the parent
     */
    app.get('/api/payment/total-paid/:id', controller.paymentData.getTotalPaid);

    /**
     * @swagger
     * /api/payment/{id}:
     *   get:
     *     summary: Get payments by parent ID
     *     tags: [Payments]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: Parent ID
     *     responses:
     *       200:
     *         description: List of payments made by the parent
     */
    app.get('/api/payment/:id', controller.paymentData.getPaymentsByParentId);

    /**
     * @swagger
     * /api/payment:
     *   post:
     *     summary: Create a new payment
     *     tags: [Payments]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *              amount_paid:
     *                  type: number
     *                  description: The amount paid
     *                  example: 1500.00
     *              status:
     *                  type: string
     *                  description: The payment status
     *                  default: "pending"
     *                  example: "completed"
     *              payment_method:
     *                  type: string
     *                  description: The method of payment
     *                  example: "credit_card"
     *              parent:
     *                  type: string
     *                  description: The ID of the parent
     *                  example: "60c72b2f9b1d8e6d88e5f3a9"
     *     responses:
     *       201:
     *         description: Payment created successfully
     */
    app.post('/api/payment', controller.paymentData.createPayment);

    /**
     * @swagger
     * /api/payments:
     *   get:
     *     summary: Get all payments
     *     tags: [Admin]
     *     responses:
     *       200:
     *         description: List of all payments
     */
    app.get('/api/payments', controller.paymentData.getPayments);
};
