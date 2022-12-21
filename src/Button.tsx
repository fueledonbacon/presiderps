import { ReactElement } from "react"
export const Button = ({ disabled, onClick, children = "" }: { disabled?: boolean, onClick?: any, children: string | ReactElement | Array<ReactElement> }) => {
    return (<button
        disabled={disabled}
        onClick={onClick}
        className="p-4 max-w-sm w-full bg-yellow-500 text-white font-bold cursor-pointer hover:bg-yellow-200"
        type="button">
        {children}
    </button>)
}