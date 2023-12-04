const db = require('../../../database/models');

const usersAPIController = {

    users: (req, res) => {
        db.Users.findAll({
            include: [{ association: "rol" }]
        })
            .then(data => {
                const users = data.map(user => ({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    detail: `http://localhost:3000/api/users/${user.id}`
                }))

                return res.status(200).json({
                    total: users.length,
                    status: 200,
                    data: users
                })
            })
            .catch(error => {
                console.error(error);
                return res.status(500).json({ 
                    status: 400,
                    error: 'Error al obtener usuarios' 
                });
            });
    },

    userDetails: (req, res) => {
        db.Users.findByPk(req.params.id, {
            include: [{ association: "rol" }]
        })
            .then(data => {
                const user = {
                    id: data.id,
                    username: data.username,
                    name: data.name,
                    surname: data.surname,
                    email: data.email,
                    birthday: data.email,
                    avatar: data.avatar,
                    rol: data.rol
                }

                return res.status(200).json({
                    status: 200,
                    data: user
                })
            })
            .catch(error => {
                console.error(error);
                return res.status(500).json({ 
                    status: 400,
                    error: 'Error al obtener usuario' 
                });
            });
    }

}

module.exports = usersAPIController;