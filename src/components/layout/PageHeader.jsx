const PageHeader = ({title, leftBtn, rightBtn}) => (
    <div className="flex flex-row items-center justify-center p-2 border-b-1 border-gray-300 relative w-full">
        {leftBtn}
        <h1 className="p-1 text-xl">{title}</h1>
        {rightBtn}
    </div>
)

export default PageHeader;