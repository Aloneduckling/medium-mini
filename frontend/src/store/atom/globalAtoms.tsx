import { atom } from "recoil";


export const userAtom = atom({
    key: 'userAtom',
    default: {
        id: '',
        name: ''
    }
});

export const globalLoadingAtom = atom({
    key: 'globalLoadingAtom',
    default: false
});