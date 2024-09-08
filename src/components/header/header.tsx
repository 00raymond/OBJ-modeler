export default function HeaderFixed() {

    const options = [
        {
            label: "Try It",
            link: "/"
        },
        {
            label: "About",
            link: "/about"
        },
        {
            label: "Login",
            link: "/login"
        },
    ]

    return (
        <div className={"flex flex-row space-x-5 p-2 bg-black text-white items-baseline"}>
            <p className={"font-bold text-white text-3xl"}>.Obj Renderer</p>
            {options.map((option) => (
                <a href={option.link} key={option.label} className={"text-white p-2 rounded-xl text-md bg-white bg-opacity-20 hover:bg-opacity-10 transition-all duration-200"}>
                    {option.label}
                </a>
            ))}
        </div>
    )
}