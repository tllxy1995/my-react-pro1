/**
 * Created by luoxinyi on 2018/1/24.
 */
const express = require('express')
const Router = express()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const utils = require('utility')

const _filter = {pwd: 0, __v: 0}

const md5pwd = pwd => {
    const salt = 'xlmaqw_+13957x8yza6!@#UHDNA~~'
    return utils.md5(utils.md5(pwd + salt))
}


Router.get('/list', (req, res) => {
    const {type} = req.query
    // User.remove({}, (e,d) => {})
    User.find({type}, (err, doc) => {
        return res.json({code: 0, data: doc})
    })
})

Router.post('/login', (req, res) => {
    const {user, pwd} = req.body
    User.findOne({user, pwd: md5pwd(pwd)}, _filter /*data不显示密码*/, (err, doc) => {
        if (!doc) {
            return res.json({code: 1, msg: '用户名或密码错误！'})
        }
        res.cookie('userid', doc._id)
        return res.json({code: 0, data: doc})
    })
})

Router.post('/register', (req, res) => {
    console.log(req.body)
    const {user, pwd, type} = req.body
    User.findOne({user}, (err, doc) => {
        if (doc) {
            return res.json({code: 1, msg: '用户名重复'})
        }
        const userModel = new User({user, type, pwd: md5pwd(pwd)})
        userModel.save((e, d) => {
            if (e) {
                return res.json({code: 1, msg: '后端出错了'})
            }
            const {user, type, _id} = d
            res.cookie('userid', _id)
            return res.json({code: 0, data: {user, type, _id}})
        })
    })
})

Router.post('/update', (req, res) => {
    const userid = req.cookies.userid
    if (!userid) {
        return json.dumps({code: 1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid, body, (err, doc) => {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body)
        return res.json({code: 0, data})
    })
})

Router.post('/readmsg', (req, res) => {
    const userid = req.cookies.userid
    const {from} = req.body
    console.log(userid, from)
    Chat.update({from, to: userid}, {'$set': {read: true}}, {'multi': true}, (err, doc) => {
        console.log(doc)
        if (!err) {
            return res.json({code: 0, num: doc.nModified})
        } else {
            return res.json({code: 1, msg: '修改失败！！'})
        }
    })
})

Router.get('/info', (req, res) => {
    //用户有没有 cookies
    const {userid} = req.cookies
    if (!userid) {
        return res.json({code: 1})
    }
    User.findOne({_id: userid}, _filter, (err, doc) => {
        if (err) {
            return res.json({code: 1, msg: '后端出错了！'})
        }
        if (doc) {
            return res.json({code: 0, data: doc})
        }
    })
})

Router.get('/getmsglist', (req, res) => {
    const user = req.cookies.userid

    User.find({}, (e, userdoc) => {
        let users = {}
        userdoc.forEach(v => {
            users[v._id] = {name: v.user, avatar: v.avatar}
        })
        Chat.find({'$or': [{from: user}, {to: user}]}, (err, doc) => {
            if (!err) {
                return res.json({code: 0, msgs: doc, users: users})
            }
        })
    })

    // {'$or': [{from: user, to: user}]}

})

module.exports = Router