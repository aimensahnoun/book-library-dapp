import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"

const Button: React.FC<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = (props) => {
    return <button {...props} className={`
    p-2 rounded-lg bg-brandAccent shadow-lg shadow-brandAccent/40 hover:shadow-brandAccent/80 active:shadow-brandAccent/100 ${props.className}
    `}></button>
}

export default Button