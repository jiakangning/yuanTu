/**
 * @author 甄岩岩
 * @date 2019-03-15
 */
const Op = require('sequelize').Op
const { Command, Menu } = require('../../model/system/index.js')

class MenuManager {
  constructor (MenuRepo = Menu, CommandRepo = Command) {
    this.menuRepo = MenuRepo
    this.commandRepo = CommandRepo
  }

  /**
   * 创建菜单
   * @param {Object}  input
   * @param {Function} callback
   */
  create (input, callback) {
    if (!input) {
      callback(new Error('请传入参数'))
    } else {
      this.menuRepo.createMenuAndCommandCascade(input,
        { Menu: this.menuRepo, Command: this.commandRepo })
        .then((res) => callback(null, res))
        .catch(callback)
    }
  }

  /**
   * 修改菜单
   * @param {Object|Array<Object>}  input
   * @param {Function} callback
   */
  update (input, callback) {
    if (!input) {
      callback(new Error('请输入参数'))
    } else {
      this.menuRepo.updateMenuAndCommandCascade(input, {
        Menu: this.menuRepo,
        Command: this.commandRepo
      })
        .then(() => callback(null, '修改成功'))
        .catch(callback)
    }
  }

  /**
   * 删除菜单
   * @param input {Array, Number}
   * @param callback
   */
  destroy (input, callback) {
    this.menuRepo.destroyMenuAndCommandCascade(input,
      { Menu: this.menuRepo, Command: this.commandRepo })
      .then(() => callback(null, '删除成功'))
      .catch(callback)
  }

  /**
   * 获取能构建成树形结构的数据
   * @param input
   * @param callback
   */
  findAll (input, callback) {
    const options = this.menuRepo.buildOptions(input)
    this.menuRepo.findAll(options)
      .then(instances => {
        const rows = instances.reduce((results, item) => {
          return results.concat(item.getParentIds())
        }, instances.map(v => v.id))
        const params = {
          where: { id: { [Op.in]: rows } },
          include: { model: this.commandRepo, required: false },
          distinct: true
        }
        return this.menuRepo.findAndCountAll(params)
      })
      .then(result => (callback(null, result)))
      .catch(callback)
  }

  /**
   * 获取可构建成菜单和指令树的数据源
   * @param input
   * @param callback
   */
  getTree (input, callback) {
    this.findAll(input, (err, { rows }) => {
      if (err) {
        callback(err)
      } else {
        let targetArr = rows.reduce((results, current) => {
          results = results.concat({
            id: current.id + '',
            label: current.text,
            parentId: current.parentId ? current.parentId + '' : null
          })
          if (current.commands && current.commands.length) {
            const commands = current.commands.map(item => {
              return {
                id: current.id + MenuManager.separator + item.id,
                label: item.text,
                parentId: `${ current.id }`
              }
            })
            results = results.concat(commands)
          }
          return results
        }, [])
        callback(null, targetArr)
      }
    })
  }

  /**
   * 拆分code, 返回指令和菜单
   * @param inputs {Array} ['1', '1-2', '1-3']
   * @return { menus, commands }
   */
  splitCode (input) {
    return input.reduce((results, item) => {
      const [menu, command] = item.split(MenuManager.separator)
      menu && !command && results.menus.push(Number(menu))
      menu && command && results.commands.push({ menu: Number(menu), command: Number(command) })
      return results
    }, { menus: [], commands: [] })
  }

  /**
   * 根据菜单和指令构建code
   * @param menus
   * @param commands
   * @return {*}
   */
  buildCode ({ menus = [], commands = [] }) {
    return commands.reduce((results, { menu, command }) => {
      return results.concat(menu + MenuManager.separator + command)
    }, menus.map(v => v + ''))
  }
}

MenuManager.separator = '-'

module.exports = MenuManager
