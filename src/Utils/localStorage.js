const getBookMarkAyahFromLocalStorage = () => {
    const bookmarkedAyah = localStorage.getItem('ayah-id');
    if(bookmarkedAyah){
        return JSON.parse(bookmarkedAyah);
    }
    return [];
}

const setAyahBookmarkToLocalStorage = (ayahId) => {
    let BookmarkAyahInLocalStorage = getBookMarkAyahFromLocalStorage();
    BookmarkAyahInLocalStorage.push(ayahId);
    const strBookmarkAyah = JSON.stringify(BookmarkAyahInLocalStorage);
    localStorage.setItem('ayah-id', strBookmarkAyah);
}

const getBookMarkSurahFromLocalStorage = () => {
    const bookmarkedSurah = localStorage.getItem('surah-id');
    if(bookmarkedSurah){
        return JSON.parse(bookmarkedSurah);
    }
    return [];
}

const setSurahBookmarkToLocalStorage = (surahId) => {
    let BookmarkSurahInLocalStorage = getBookMarkSurahFromLocalStorage();
    if(!BookmarkSurahInLocalStorage.includes(surahId)){
        BookmarkSurahInLocalStorage.push(surahId);
    }
    const strBookmarkSurah = JSON.stringify(BookmarkSurahInLocalStorage);
    localStorage.setItem('surah-id', strBookmarkSurah);
}


export { getBookMarkAyahFromLocalStorage, getBookMarkSurahFromLocalStorage, setAyahBookmarkToLocalStorage, setSurahBookmarkToLocalStorage };

