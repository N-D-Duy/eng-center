const Admin = require('../../models/admin');
const Account = require('../../models/account');
const hashPassword = require('../../utils/hash_password');
const { checkValidPassword } = require('../../utils/auth_check');


const createAdmin = async (req, res) => {
    const { account, unique_code } = req.body;
    //require unique code
    if(unique_code !== "eng-center-admin") {
        return res.status(401).send("Unauthorized");
    }

    if(account.role !== "admin") {
        return res.status(400).send("Invalid role");
    }

    if(checkValidPassword(account.password) === false) {
        return res.status(400).json({
            error: 'Password is too weak (>8, contains number, special character)'
        });
    }

    //hash password before save to database
    account.password = await hashPassword(account.password);
    
    const accountData = new Account(account);
    const emailExist = await Account.findOne({ email: accountData.email });
    if(emailExist){
        return res.status(400).json({
            error: 'Email already exists'
        });
    }
    await accountData.save();
    const account_id = accountData._id;
    const admin = new Admin({
        account: account_id,
    });

    try {
        await admin.save();
        res.status(201).json({
            data: admin,
            message: 'Admin created successfully'
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

exports.createAdmin = createAdmin;