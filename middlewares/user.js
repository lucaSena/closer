class MiddleUser
{
    static notLogged(req, res, next)
    {
        if(req.session.UserInfo == undefined)
            next()
        else
            res.redirect('/')
    }

    static logged(req, res, next)
    {
        if(req.session.UserInfo != undefined)
            res.redirect('/')
        else
            next()
    }
}

module.exports = MiddleUser