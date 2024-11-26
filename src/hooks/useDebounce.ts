import { ChangeEvent, useCallback, useEffect, useState } from "react";

export const useDebounce = (delay: number) => {
    const [initialValue, setInitialValue] = useState<string>("");
    const [debouncedValue, setDebouncedValue] = useState<string>(initialValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(initialValue.trim());
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [initialValue, delay]);
    
    const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value as string;
        setInitialValue(newValue);
    }, []);

    return { value: debouncedValue, onChangeHandler };
};