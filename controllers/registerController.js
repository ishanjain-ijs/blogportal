const Admin = require("../models/admin");
// const bcrypt = require('bcrypt');

const dotenv = require("dotenv");
dotenv.config({ path: './config.env' });

const handleNewUser = async (req, res) => {
    console.log(req.body)
    const {  username, password} = req.body;
    // var token = req.headers.authorization.split(" ")[1];
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` },
    //   };
    if (!username || !password) return res.status(400).json({ 'message': 'All fields are required.' });

    try {

        // const hashedPwd = await bcrypt.hash(password, 10);
        const result = await Admin.create({
            
            "username": username,
            "password": password,

        })
        .then(result => {
            // console.log(result)
            res.status(201).json({ 'success': `New user ${fullName} created!` , result});
        })
        .catch(err => {
            res.json({'message': `User with username ${username} already exist`})
            console.log(err)
        })

    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports =  handleNewUser ;




