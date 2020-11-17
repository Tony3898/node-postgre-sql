const Promise = require("bluebird")
const {Pool} = Promise.promisifyAll(require('pg'))
const format = require('pg-format');

class Github {
  constructor() {
    this.pool = new Pool({
      user: Tony.Config.postgre.user,
      host: Tony.Config.postgre.host,
      database: Tony.Config.postgre.database,
      password: Tony.Config.postgre.password,
      port: Tony.Config.postgre.port,
    })
  }

  async insert(options) {
    try {
      if (Array.isArray(options)) {
        let users = []
        options.forEach(o => {
          let {id, name, html_url, description, created_at, open_issues, watchers} = o
          let owner_id = o.owner.id, owner_avatar_url = o.owner.avatart_url, owner_html_url = o.owner.html_url,
              owner_type = o.owner.type, owner_site_domain = o.owner.site_domain
          users.push([id, name, html_url, description, created_at, open_issues, watchers, owner_id, owner_avatar_url, owner_html_url, owner_type, owner_site_domain])
        })
        return await this.pool.query(format('insert into users(id, name, html_url, description, created_at, open_issues, watchers, owner_id, owner_avatar_url, owner_html_url, owner_type, owner_site_domain) values %L ON CONFLICT (id) DO NOTHING returning id;', users))
      } else {
        let {id, name, html_url, description, created_at, open_issues, watchers} = options
        let owner_id = options.owner.id, owner_avatar_url = options.owner.avatart_url,
            owner_html_url = options.owner.html_url,
            owner_type = options.owner.type, owner_site_domain = options.owner.site_domain
        return await this.pool.query(format('insert into users(id, name, html_url, description, created_at, open_issues, watchers, owner_id, owner_avatar_url, owner_html_url, owner_type, owner_site_domain) values %L ON CONFLICT (id) DO NOTHING returning id ;', [id, name, html_url, description, created_at, open_issues, watchers, owner_id, owner_avatar_url, owner_html_url, owner_type, owner_site_domain]))
      }
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async getAllUsers() {
    try {
      return await this.pool.query("select * from users")
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async getUserById(id) {
    console.log(id)
    try {
      return await this.pool.query(`select * from users where id = '${id}'`)
    } catch (e) {
      throw new Error(e.message)
    }
  }
}

module.exports = new Github()