export const defaults = {
    isLoggedIn: Boolean(localStorage.getItem("token")) || false
};

export const resolvers = {
    // context 상의 token이나 cache 같은
    // arguments를 가질 것 이다.
    Mutation: {
        logUserIn: (_, {token}, {cache}) => {
            localStorage.setItem("token", token);
            cache.writeData({
                data: {
                    isLoggedIn: true
                }
            });
            return null;
        },
        logUserOut: (_, __, {cache}) => {
            localStorage.removeItem("token");
            window.location.reload();
            return null;
        }
    }
};