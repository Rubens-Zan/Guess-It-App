import Header from "./Header"
import Footer from "./Footer"

export default function Layout({children}){
    
    return(
        <div style={{height: "100%", width: "100%", backgroundColor: "#3f0071"}}>
            <Header/>
            <div style={{marginTop: '50px',color: "#fff"}}>
                {children}
            </div>
            <Footer />
        </div>
    )
};