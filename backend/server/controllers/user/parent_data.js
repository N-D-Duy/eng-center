const Parent = require('../../models/parent.js');
const Account = require('../../models/account.js');
const mongoose = require('mongoose');
const account = require('../../models/account.js');
const Student = require('../../models/student.js');

const getParentInfor = async (req, res) => {
    try {
        const parent = await Parent.findById(req.params.id);
        return res.status(200).json({
            data: parent
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
};

const getAllParents = async (req, res) => {
    try {
        const parents = await Parent.find();
        return res.status(200).json({
            data: parents
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
};

const createParent = async (req, res) => {
    //account and invite code from req.body
    const { account, parent } = req.body;
    const invite_code = parent.invite_code;
    console.log(invite_code)
    
    //check if invite code is valid
    //query students to find the student match with the invite code
    const student = await Student.findOne({ _id: invite_code });
    if (!student) {
        return res.status(400).json({
            error: 'Invalid invite code'
        });
    }
    try {
        //create new account
        const accountSchema = new Account(account);
        if(account.role != 'parent'){
            return res.status(400).json({
                error: 'Invalid role'
            });
        }

        //check email already exists
        const emailExist = await Account.findOne({ email: accountSchema.email });
        if(emailExist){
            return res.status(400).json({
                error: 'Email already exists'
            });
        }

        await accountSchema.save();

        //get account id to assign to parent
        const account_id = accountSchema._id;
        req.body.parent.account = account_id;
        

        try{
            //create new parent
            const parent = await Parent.create(req.body.parent);
            //update student (parent field) if invite code
            student.parent = parent._id;
            await student.save();
        } catch (error) {
            return res.status(400).json({
                error: error.message
            });
        }
        return res.status(201).json({
            data: parent,
            message: 'Parent created successfully'
        });

        
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
};

module.exports = {
    getParentInfor,
    getAllParents,
    createParent
};
