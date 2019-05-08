/**
 * author:甄岩岩,
 * createdAt:2019-3-15
 * */
const Command = require('./Command')
const Menu = require('./Menu')
const Contact = require('../membership/Contact')
const Department = require('./Department')

const ER1 = Menu.hasMany(Command, { as: 'command', foreignKey: 'menu_id' })
// const ER2 = Contact.hasMany(Department, { foreignKey: 'supervisor' })
// const ER3 = Contact.hasMany(Department, { foreignKey: 'author' })
// const ER4 = Contact.hasMany(Department, { foreignKey: 'editor' })

// module.exports = ER1
module.exports = {
  ER1
}
