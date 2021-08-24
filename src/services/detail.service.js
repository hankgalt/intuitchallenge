export const detailService = {
    fetchDetails,
    fetchLocations,
    save,
    unSave
};

async function fetchDetails(id) {
    let savedList = {};
    const saved = localStorage.getItem('saved');
    if (saved) {
        savedList = JSON.parse(saved);
    }
    const response = await fetch(
        `poke/pokemon/${id}`,
    );
    const result = await response.json();
    return { ...result, saved: !!savedList[parseInt(id)] };
}

async function fetchLocations(id) {
    console.log("fetchLocations() - id: ", id);
    // const response = await fetch(
    //     `loc/${id}`,
    //     {
    //         method: 'GET',
    //         withCredentials: true,
    //         credentials: 'include',
    //         headers: {
    //             'X-Api-Key': process.env.LOC_API_KEY
    //         }
    //     }
    // );
    // const result = await response.json();
    // if (!result.message) {
    //     return result.locations;
    // }
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