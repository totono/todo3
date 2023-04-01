/** @jsxImportSource @emotion/react */
import { Input } from "antd";
import { textFormStyle } from "./textFormStyle";
import { useEffect, useState } from "react";
import { taskCommand } from "../../../../../ipcs";

const { TextArea } = Input;


type TextFormProps = {
    id: number;
    value: string | undefined;
}

export const TextForm = ({id,value}:TextFormProps) => {
    const text = value ?? "";
    const [inputText, setInputText] = useState(text);
    const debounceText = useDebouce(inputText, 500);

    useEffect(() => {
        taskCommand.updateText(id,debounceText);
        console.log(debounceText);
    }, [debounceText])
    
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(e.target.value);
    }

    return (
        <TextArea css={textFormStyle} value={inputText} onChange={handleInput}/>
    )

}


const useDebouce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}