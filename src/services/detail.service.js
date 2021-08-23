export const detailService = {
    fetchDetails,
    fetchLocations,
    save,
    unSave
};

async function fetchDetails(id) {
    const retrievedObject = localStorage.getItem(id);
    const saved = localStorage.getItem('saved');
    let savedList = {};
    if (saved) {
        savedList = JSON.parse(saved);
    }
    if (!retrievedObject) {
        const response = await fetch(
            `poke/pokemon/${id}`,
        );
        const result = await response.json();
        localStorage.setItem(id, JSON.stringify(result));
        return { ...result, saved: !!savedList[parseInt(id)] }
    } else {
        const result = JSON.parse(retrievedObject);
        return { ...result, saved: !!savedList[parseInt(id)] }
    }
}

async function fetchLocations(id) {
    console.log("fetchLocations() - id: ", id);
    return [[32.715736, -117.161087]];
}

function save(id, name) {
    let saved = localStorage.getItem('saved');
    if (!saved) {
        saved = {[id]: name};
        localStorage.setItem('saved', JSON.stringify(saved));
    } else {
        saved = JSON.parse(saved);
        if (!saved[id]) {
            saved[id] = name;
        }
        localStorage.setItem('saved', JSON.stringify(saved));
    }
}

function unSave(id) {
    let saved = localStorage.getItem('saved');
    saved = JSON.parse(saved);
    if (saved && saved[id]) {
        delete saved[id];
    }
    localStorage.setItem('saved', JSON.stringify(saved));
}