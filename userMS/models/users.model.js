module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        first_name: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true,
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true            
        },
        user_id: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
});
    return Users;
};
