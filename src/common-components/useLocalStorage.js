import { useState, useEffect } from "react";

function getInitialValue(key, initialValue) {
    const savedValue = JSON.parse(localStorage.getItem(key));
    if (savedValue) return savedValue;

    return initialValue;
}

export default function useLocalStorage(key, initialValue = []) {
    const [value, setValue] = useState(() => getInitialValue(key, initialValue))

    const updateValue = (item) => {
        let values;
        const isExist = value.some(itm => itm.id == item.id)
        if (isExist) {
            values = value.filter(value => value.id !== item.id)
        } else {
            values = [...value, item]
        }

        setValue(values)
    }

    const updateQuantity = (item, operation, input = undefined) => {
        const withOperation = item.quantity + (operation === "plus" || !operation ? 1 : -1);
        if (withOperation <= 0)
            updateValue(item)
        else
            setValue(value.map(itm => item.id == itm.id ? { ...itm, quantity: input ? parseInt(input) : withOperation } : itm))

    }

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value])

    return [value, updateValue, updateQuantity]
}