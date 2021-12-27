
export default function Header(){
    return(
        <div 
            style={{
                position: "fixed",
                top:'0',
                backgroundColor: "#000", 
                width: "100%", 
                height: '50px',
                display: "flex",
                alignItems: "center",
                padding: "0 20px"
            }}
        >
            <h1 
                style={{
                    fontSize: "14px", 
                    color: "#fff"
                }}
            >
                Guess It
            </h1>    
        </div>
    )
}