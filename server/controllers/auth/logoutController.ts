import {User} from "../../models/User";

export const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt)
        return res.sendStatus(204);

    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne(
        ({
            where: {
                refreshToken: refreshToken
            }
        })
    );

    if (!foundUser) {
        res.clearCookie('jwt', {httpOnly: true});
        return res.sendStatus(204)
    }

    foundUser.refreshToken = null;
    await foundUser.save();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true }); // secure: true
    res.sendStatus(204);
}