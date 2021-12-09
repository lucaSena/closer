class MiddleUser
{
    static logged(req, res, next)
    {
        if(req.session.userLogged != undefined)
            next()
        else
            res.redirect('/')
    }

    static notLogged(req, res, next)
    {
        if(req.session.userLogged != undefined)
            res.redirect('/')
        else
            next()
    }
}