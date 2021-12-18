const { Conflict } = require('http-errors');


const { User } = require('../../models');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict(`User with ${email} already exist`)
    }


    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            user: {
                name,
                email,
                avatarUrl
            }
        }
    })

}

module.exports = register;
