import { useState } from 'react';


//TODO: Change the variables names
// export const useLocalStorage = (key, defaultValue) => {
//     const [value, setValue] = useState(() => {
//         const storedData = localStorage.getItem(key);

//         return storedData ? JSON.parse(storedData) : defaultValue;
//     });

//     const setLocalStorageValue = (newValue) => {
//         localStorage.setItem(key, JSON.stringify(newValue));

//         setValue(newValue);
//     };

//     return [
//         value,
//         setLocalStorageValue,
//     ];
// }

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        const storedData = localStorage.getItem(key);

        return storedData ? JSON.parse(storedData) : defaultValue;
    });

    const setLocalStorageValue = (newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue));

        setValue(newValue);
    };

    return [
        value,
        setLocalStorageValue,
    ];
}
