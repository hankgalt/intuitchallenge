export const listService = {
    fetchList,
    showSaved
};

async function fetchList(offset = 0, limit = 20) {
    const item = `${offset}-${limit}`
    const retrievedObject = localStorage.getItem(item);
    if (!retrievedObject) {
        const response = await fetch(
            `poke/pokemon?` + new URLSearchParams({
                limit,
                offset,
            }),
        );
        const result = await response.json();
        
        if (result.next) {
            const params = result.next.split('?')[1].split('&').reduce((acc, val) => {
                const att = val.split('=');
                acc[att[0]] = att[1];
                return acc;
            }, {});
            const {offset, limit} = params;
            localStorage.setItem(`${offset-limit >= 0 ? offset-limit : 0}-${limit}`, JSON.stringify(result));
            return { ...result, offset, limit };
        }
    } else {
        const result = JSON.parse(retrievedObject);
        const params = result.next.split('?')[1].split('&').reduce((acc, val) => {
            const att = val.split('=');
            acc[att[0]] = att[1];
            return acc;
        }, {});
        const {offset, limit} = params;
        return { ...result, offset, limit };
    }
}

function showSaved() {
    const saved = localStorage.getItem('saved');
    let savedList = {};
    if (saved) {
        savedList = JSON.parse(saved);
    }
    return savedList;
}
