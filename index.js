const lsauce = {
    id: function() {
        return Math.random()
            .toString(36)
            .slice(2);
    },
    save: function(d) {
        let { collection, ...data } = d;
        let state;
        state = JSON.parse(localStorage.getItem(collection));

        if (state) {
            let len = state.push({
                ...data,
                _id: this.id()
            });
            localStorage.setItem(collection, JSON.stringify(state));

            state = state[len - 1];
        } else {
            state = {
                ...data,
                _id: this.id()
            };
            window.localStorage.setItem(collection, JSON.stringify([state]));
        }
    },
    get: function(d) {
        let { collection, ...data } = d;
        let state = JSON.parse(localStorage.getItem(collection));

        if (!state) {
            return null;
        }

        return state.filter(rec => {
            for (let key in data) {
                if (rec[key] !== data[key]) {
                    return false;
                }
            }
            return rec;
        });
    },
    update: function(d) {
        let { collection, _id, ...data } = d;
        let state = JSON.parse(localStorage.getItem(collection));
        let len = state.length;

        for (let i = 0; i < len; i++) {
            if (state[i]._id === _id) {
                for (let key in data) {
                    state[i][key] = data[key];
                }
                localStorage.setItem(collection, JSON.stringify(state));
                break;
            }
        }
    },
    delete: function(collection, id) {
        let state = JSON.parse(localStorage.getItem(collection));
        for (let i = 0; i < state.length; i++) {
            if (state[i]._id === id) {
                state.splice(i, 1);
                localStorage.setItem(collection, JSON.stringify(state));
                break;
            }
        }
    }
};
