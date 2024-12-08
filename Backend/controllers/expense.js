const Expense = require('../models/expense')

exports.getAll = async(req,res)=>{
    try{
        const allExpense = await Expense.findAll();
        res.send(allExpense);
    }catch(err){
        console.log(err)
    }
}
exports.getOne = async(req,res)=>{
    try{
        const {id} = req.params;
        const oneExpense = await Expense.findByPk(id);
        res.send(oneExpense);
    }catch(err){
        console.log(err)
    }
}
exports.createExpense = async(req,res)=>{
    try{
        const {amount,description,category} = req.body;
        await Expense.create({amount,description,category});
        const allExpense = await Expense.findAll();
        res.send(allExpense);
    }catch(err){
        console.log(err)
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findByPk(id);
        if (!expense) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        await expense.destroy();
        const expenses = await Expense.findAll();
        res.send(expenses);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: err.message,
        });
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, description, category } = req.body;
        const user = await Expense.findByPk(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        await user.update({ amount, description, category });
        const users = await Expense.findAll();
        res.send(users);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update user",
            error: err.message,
        });
    }
};