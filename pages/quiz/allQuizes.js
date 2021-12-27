import Link from 'next/link'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

export default function allQuizes(){
    return(
        <>
            <Header/>
            <div>
                <h1>
                    Todos os quizes
                </h1>
            </div>
            <div>
                <h2>
                    <Link href='heroes'>
                        <a>First quiz</a>
                    </Link>
                </h2>
            </div>
            <Footer/>
        </>

    ) 
}