/**
 *  组合命令和 菜单
 * */
const Menu = require('../../model/system/Menu')
const Command = require('../../model/system/Command')

exports.getComposeTree = async function (req, res) {
  const f1 = Command.findAll({ attributes: [['id', 'cId'], ['text', 'cLabel'], ['moduleId', 'cParentId']] })
  const f2 = Menu.findAll({ attributes: [['id', 'mId'], ['moduleText', 'mLabel'], ['parentId', 'mParentId']] })
  Promise.all([f1, f2]).then(results => {
  })
}
