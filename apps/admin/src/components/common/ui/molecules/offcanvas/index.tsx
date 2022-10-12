
const OffCanvas = () => {
    return (
        <div className="fixed top-0 right-0 z-50 bg-white shadow-md w-1/3 min-h-screen">
            <div className="flex justify-between">
                <div className="">{'< Order Details'}</div>
                <div className="">#003</div>
            </div>
            <div className="flex justify-between">
                <div className="">Customer ID</div>
                <div className="">655465121</div>
            </div>
            <div className="flex justify-between">
                <div className="">Order Address</div>
                <div className="">R Cortinhas Fonte 44</div>
            </div>
            <div className="flex justify-between">
                <div className="">Payment Method</div>
                <div className="">Paypal</div>
            </div>
            <div className="absolute bottom-0 left-0 right-0">
                <div className="flex justify-between px-4 pb-10">
                    <div className="">DELETE</div>
                    <div className="">EDIT</div>
                </div>
            </div>
        </div>
    )
}

export default OffCanvas
