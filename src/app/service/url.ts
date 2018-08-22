const host = '';

export const urls = {
    user: {
        getUsersByName: host + 'api/users/{name}',
        getUserByid:  host + 'api/users/{id}',
        addUser: host + 'api/users',
        update: host + 'api/users',
        deleteUser: host + 'api/users/{id}',
    }
};
