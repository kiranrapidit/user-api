const db = require("../models/db.config");
let env = process.env.NODE_ENV || 'DEV'
let config = require("../config")[env]
const Users = db.users;
const Op = db.Sequelize.Op;
const log = require("../logger/logger")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



/*
    * @params {object} : {
    "first_name": "kiran",
    "last_name": "1234",
    "user_id": "1234",
    "email": "kiran2@gmail.com",
    "password": "Kiran@23456789"
}
    */

const createUser = async (userdetails) => {
    return new Promise(async (resolve, reject) => {
        var createUserRes
        try {
            let user = await Users.findOne({
                where: {
                    email: userdetails.email
                }
            })
            console.log("-----", user)
            if (user != null) {
                createUserRes = ({
                    message: 'This email is taken',
                });
                log.info('registration Failure details...', createUserRes);
            } else {

                let verifiedpass = await checkPasswordValidation(userdetails.password)
                console.log("------verifiedpass-------", verifiedpass);
                if (verifiedpass != null) {
                    createUserRes = ({
                        message: verifiedpass,
                    });
                    log.info('registration Failure details...', verifiedpass);
                } else {
                    const newUser = new Users(userdetails);
                    // generate salt to hash password
                    const salt = (10);
                    // now we set user password to hashed password
                    newUser.password = await bcrypt.hash(newUser.password, salt);
                    //console.log("--newUser.password--------------", newUser.password)
                    await newUser.save().then((user) => {
                        console.log("------", user)
                        createUserRes = user;
                        log.info('registration Successfull details...', createUserRes);

                    }).catch((err) => {
                        createUserRes = ({
                            message: 'Error registering',
                            err,
                        });
                        resolve(createUserRes);
                        log.info('registration Failure details...', createUserRes);
                    });
                }              
                resolve(createUserRes);
            }
        } catch (err) {
            log.info('registration Failure details...', err);
            reject(err)
        }
    })
}


/*
    * @params {string} : value : passwordValue
    */
async function checkPasswordValidation(value) {
    const isWhitespace = /^(?=.*\s)/;
    if (isWhitespace.test(value)) {
        return "Password must not contain Whitespaces.";
    }


    const isContainsUppercase = /^(?=.*[A-Z])/;
    if (!isContainsUppercase.test(value)) {
        return "Password must have at least one Uppercase Character.";
    }


    const isContainsLowercase = /^(?=.*[a-z])/;
    if (!isContainsLowercase.test(value)) {
        return "Password must have at least one Lowercase Character.";
    }


    const isContainsNumber = /^(?=.*[0-9])/;
    if (!isContainsNumber.test(value)) {
        return "Password must contain at least one Digit.";
    }


    const isContainsSymbol =
        /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
    if (!isContainsSymbol.test(value)) {
        return "Password must contain at least one Special Symbol.";
    }


    const isValidLength = /^.{10,16}$/;
    if (!isValidLength.test(value)) {
        return "Password must be 10-16 Characters Long.";
    }

    return null;
}

// async function createNewuser(userdetails) {
//     let createUserRes;
//     const newUser = new Users(userdetails);
//     // generate salt to hash password
//     const salt = await bcrypt.genSalt(10);
//     // now we set user password to hashed password
//     newUser.password = await bcrypt.hash(newUser.password, salt);
//     console.log("------",)
//     await newUser.save().then((user) => {
//         console.log("------", user)
//         createUserRes = user;        
//         log.info('registration Successfull details...', createUserRes);
//     }).catch((err) => {
//         createUserRes = ({
//             message: 'Error registering',
//             err,
//         });       
//         log.info('registration Failure details...', createUserRes);
//     });
//     return createUserRes;
// }

/*
    * @params {object} : {
   "loginId": "kiran1@gmail.com",
    "password": "123456789"
}
    */
const loginUser = async (loginDetails) => {
    return new Promise(async (resolve, reject) => {
        let loginRes;
        try {
            const user = await Users.findOne({ where: { [Op.or]: [
                {
                  user_id: loginDetails.loginId
                }, {
                  email: loginDetails.loginId
                }
              ] } });

            log.info('existing user details...', user);

            if (user) {
                // check user password with hashed password stored in the database
                const validPassword = await bcrypt.compare(loginDetails.password, user.password);
                if (validPassword) {
                    const token = jwt.sign({ user_id: user.user_id, email: user.email }, config.secret, {
                        expiresIn: config.jwtExpiration
                    });
                    loginRes = ({
                        success: { code: "200", error: "User login successful" },
                        id: user.id,
                        username: user.first_name,
                        email: user.email,
                        accessToken: token,
                    });
                } else {
                    loginRes = ({ code: "404", message: "Invalid Password" });
                }
            } else {
                loginRes = ({ code: "201", message: "User does not exist" });
                log.info('register Failure details...', loginRes);
            }
            resolve(loginRes)
        } catch (err) {
            log.info('login Failure details...', err);
            reject(err)
        }
    })
}

const userProfile = (id) => {
    return new Promise(async (resolve, reject) => {
        let userProfileRes;
        try {
            const user = await Users.findOne({ where: { id: id } });

            log.info('existing user details...', user);

            if (user) {
                // check user password with hashed password stored in the database

                userProfileRes = ({
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email
                })
            } else {
                userProfileRes = ({ code: "201", message: "User does not exist" });
                log.info('register Failure details...', loginRes);
            }
            resolve(userProfileRes)
        } catch (err) {
            log.info('login Failure details...', err);
            reject(err)
        }
    })
}

const updateUserProfile = async (userdetails) => {
    return new Promise(async (resolve, reject) => {
        var updateUserProfileRes
        try {
            let user = await Users.findOne({
                where: {
                    email: userdetails.email
                }
            })
            console.log("-----", user)
            if (user == null) {
                updateUserProfileRes = ({
                    message: 'user not found',
                });
                log.info('user update Failure details...', updateUserProfileRes);
            } else {

                const id = user.id;

                console.log("--userdetails-------------------------", id)
                const olduser = new Users(userdetails);
                // generate salt to hash password
                const salt = (10);
                // now we set user password to hashed password
                olduser.password = await bcrypt.hash(olduser.password, salt);
                await olduser.update(olduser, {
                    where: { id: id }
                }).then((user) => {
                    console.log("------", user)
                    updateUserProfileRes = user;
                    log.info('user  details Successfull updated...', updateUserProfileRes);
                }).catch((err) => {
                    updateUserProfileRes = ({
                        message: 'Error registering',
                        err,
                    });
                    resolve(updateUserProfileRes);
                    log.info('user  details update Failure...', updateUserProfileRes);
                });
            }
            console.log("--createUserRes----", updateUserProfileRes)
            resolve(updateUserProfileRes);
        } catch (err) {
            log.info('registration Failure details...', err);
            reject(err)
        }
    })
}


module.exports = {
    createUser: createUser,
    loginUser: loginUser,
    userProfile: userProfile,
    updateUserProfile: updateUserProfile
}