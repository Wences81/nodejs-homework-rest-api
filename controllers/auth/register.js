const { Conflict } = require('http-errors');

const bcrypt = require('bcryptjs');
const { uuid } = require('uuid')


const { sendEmail } = require('../../helpers');
const { User } = require('../../models');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict(`User with ${email} already exist`)
    }

    const verificationToken = uuid();
    const newUser = new User({ name, email, verificationToken });

    newUser.setPassword(password);

    await newUser.save();
    const mail = {
        to: email,
        subject: 'Подтверждения email',
        html: `<a target='_blank' href='http://localhost:3000/api/users/verify/${verificationToken}'>Подтвердить email</a>`
    };

    await sendEmail(mail);




    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            user: {
                name,
                email,

                name,
                verificationToken


            }
        }
    })

}

module.exports = register;
