import jwt from 'jsonwebtoken';

export const profileController = (req, res)=>{
    return res.json({
        user: req.user
    })
}