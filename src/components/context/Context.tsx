import { createContext, useState, ReactNode } from "react";
import runChat from "../../config/gemini";

interface ContextProps {
    previewPrompt: string[];
    setPreviePrompt: React.Dispatch<React.SetStateAction<string[]>>;
    onSent: (prompt?: string | undefined) => Promise<void>;
    setRecentPrompt: React.Dispatch<React.SetStateAction<string>>;
    recentPrompt: string;
    showResult: boolean;
    setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
    resultData: string;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
    newChat: () => void;
}

export const Context = createContext<ContextProps>({
    previewPrompt: [],
    setPreviePrompt: () => { },
    onSent: async () => { },
    setRecentPrompt: () => { },
    recentPrompt: "",
    showResult: false,
    setShowResult: () => { },
    resultData: "",
    input: "",
    setInput: () => { },
    loading: false,
    newChat: () => { },
});

const ContextProvider = (props: { children: ReactNode }) => {
    const [input, setInput] = useState<string>("");
    const [previewPrompt, setPreviePrompt] = useState<string[]>([]);
    const [recentPrompt, setRecentPrompt] = useState<string>("");
    const [showResult, setShowResult] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [resultData, setResultData] = useState<string>("");

    const delayPara = (index: number, nextWord: string) => {
        setTimeout(function () {
            setResultData((prev) => prev + nextWord);
        }, 10 * index);
    };

    const newChat = () => {
        setShowResult(false);
        setLoading(false);
        setResultData("");
        setPreviePrompt([]);
        setRecentPrompt("");
    };

    const onSent = async (prompt: string | undefined) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        let res = "";
        if (prompt !== undefined) {
            setRecentPrompt(prompt);
            res = await runChat(prompt);
        } else {
            setRecentPrompt(input);
            res = await runChat(input);
            setPreviePrompt((prev) => [...prev, input]);
        }

        const responseArray = res.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
        const newResponse2 = newResponse.split("*").join("<br />");
        const newResponsearray = newResponse2.split("");
        for (let i = 0; i < newResponsearray.length; i++) {
            const nextWord = newResponsearray[i];
            delayPara(i, nextWord + "");
        }
        setLoading(false);
        setInput("");
    };

    const contextValue: ContextProps = {
        previewPrompt,
        setPreviePrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        setShowResult,
        resultData,
        input,
        setInput,
        loading,
        newChat,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
