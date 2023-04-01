import dayjs, { Dayjs } from "dayjs";


const today = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
  
    return `${yyyy}/${mm}/${dd}`;
  };

export type InputState = {
    title: string;
    text: string;
    date: Dayjs | null;
    time: Dayjs | null;
    filePath: string;
}

export const initialState: InputState = {
    title: "",
    text: "",
    date: dayjs(today(), "YYYY/MM/DD"),
    time: null,
    filePath: "",
  };