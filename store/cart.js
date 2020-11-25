const state = () => ({
    products: [],
    total: 0,
});

const getters = {
    totalPrice(state) {
        return state.total;
    },
    cartProducts(state) {
        return state.products;
    },
};

const actions = {
    initializeCart({ commit }) {
        const localStorageCart = JSON.parse(localStorage.getItem('cart')) || '';
        if (localStorageCart) {
            commit('initCartState', localStorageCart);
        }
    },
    addToCart({ commit }, orderItem) {
        commit('updateCart', orderItem);
        commit('updateTotal');
    },
    clearCart({ commit }) {
        commit('clearCart');
    },
};

const mutations = {
    initCartState(state, cart) {
        state.products = cart.products;
        state.total = cart.total;
    },
    updateCart(state, orderItem) {
        const productIndex = state.products.findIndex(
            (product) => product.product === orderItem.product
        );
        if (productIndex < 0) {
            state.products.push(orderItem);
        } else {
            state.products[productIndex].count += orderItem.count;
        }
    },
    updateTotal(state) {
        state.total = state.products
            .reduce((a, b) => a + b.price * b.count, 0)
            .toFixed(2);
        localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart(state) {
        state.products = [];
        state.total = 0;
        localStorage.removeItem('cart');
    },
};

export default { state, getters, actions, mutations };
