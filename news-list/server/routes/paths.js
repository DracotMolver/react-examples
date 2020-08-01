const paths = {
    home: '/',
    app: {
        root: '/api/v1',
        news: {
            getAll: '/news',
            delete: '/news/:id'
        }
    }
};

module.exports = paths;
