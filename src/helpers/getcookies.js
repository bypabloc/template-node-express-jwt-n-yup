// https://alligator.io/nodejs/express-cookies/

export default (req) => {
    const cookies = req.headers.cookie;
    if(!cookies) return {};

    const parsed = cookies.split(';').reduce((prev, curr) => {
        const [name, value] = curr.split('=');
        prev[name.trim()] = value.trim();
        return prev;
    }, {});
    return parsed;
};