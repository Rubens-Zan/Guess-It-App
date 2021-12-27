import Link from 'next/link';
import React,{ useState, useEffect} from 'react';

export const getStaticProps = async ()=>{

    const res = await fetch('https://api.github.com/gists/a923f2b651a005ca3ca7f851141efcbc')
    const data = await res.json()

    const heroesObj = JSON.parse(data.files['superheroes.json'].content)

    return {
        props: {
            heroesObj
        }
    }
}

export default function Heroes(props){
    const [heroesObj, getHeroes] = useState(()=>{
        const heroesObjAux = {};
        var dcComics = {};
        var  marvelComics = {};

        for (let i=0;i < props.heroesObj.length;i++){
            const curHero = props.heroesObj[i];
            const formattedName = curHero.superhero.toLowerCase();
            const publisherFormatted = curHero.publisher.replace(" ","_");

            if (publisherFormatted == 'DC_Comics'){
                dcComics[formattedName] = {
                    superName:curHero.superhero, 
                    alterEgo : curHero.alter_ego,
                    show: false,
                }
            }else{
                marvelComics[formattedName] = {
                    superName:curHero.superhero, 
                    alterEgo : curHero.alter_ego,
                    show: false,
                }
            }
            heroesObjAux[formattedName] = {
                superName:curHero.superhero, 
                alterEgo : curHero.alter_ego,
                show: false,
                publisher: curHero.publisher
            }
            
        } 

        
        return {heroesObjAux, dcComics, marvelComics};
    })

    const [corrects, setCorrects] = useState(0);
    const [dcCorrects, setDcCorrects] = useState(0);
    const [marvelCorrects, setMarvelCorrects] = useState(0);

    const [heroAttempt, setHero] = useState('');
    const [seconds, setSeconds] = useState(120);
    const [isActive, setIsActive] = useState(false);

    useEffect(()=>{
        let interval = null;
        if (isActive) {
          interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
          }, 1000);
        } else if (!isActive && seconds !== 0) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);
    
    function getHeroesCards(type) {
         
        if (type == 1){
            return Object.values(heroesObj.dcComics).map((hero)=>{
                return (
                    <div key={'MARVEL:'+hero.superName}>
                        <h2 style={{marginLeft: "20px"}}>Name: {hero.show ? hero.superName : hero.superName.substring(0,1)}</h2>
                    </div>
                )
            })
            
        }else {
            return Object.values(heroesObj.marvelComics).map((hero)=>{
                return (
                    <div key={'DC:'+hero.superName}>
                        <h2 style={{marginLeft: "20px"}}>Name: {hero.show ? hero.superName : hero.superName.substring(0,1) }</h2>
                    </div>
                )
            })    
            
        }

        return null;
    }

    function handleHeroAttempt() {
        console.log("hero att", heroAttempt);
        const curHero = heroAttempt.toLowerCase();
        if (heroesObj.heroesObjAux[curHero] && !heroesObj.heroesObjAux[curHero].show){
            heroesObj.heroesObjAux[curHero].show = true;
            setCorrects(corrects+1)
            
            if (heroesObj.heroesObjAux[curHero].publisher == 'Marvel Comics'){
                heroesObj.marvelComics[curHero].show = true;
                setMarvelCorrects(marvelCorrects+1)
            }else{
                heroesObj.dcComics[curHero].show = true;
                setDcCorrects(dcCorrects+1)
            }
        }
    }

    return(
        <div>
            <div style={{display: "flex", justifyContent: "center"}}> 
                <h1>
                    Heroes Quiz
                </h1>
            </div>

            <div style={{alignItems: 'center',flexDirection: "column",paddingTop: "20px",display: "flex", width: "100%", justifyContent: "center"}}>
                <h1>{corrects+'/'+Object.keys(heroesObj.heroesObjAux).length+' '+seconds+'s'}</h1>
                <input 
                    style={{
                        backgroundColor: "#83409f",
                        color: "#fff",
                        width: "50vw",
                        height: "30px"
                    }}
                    type="text" 
                    value={heroAttempt}
                    onChange={(evt)=>setHero(evt.target.value)}
                />
                <button 
                    style={{
                        cursor: "pointer",
                        marginTop: "20px",
                        borderRadius: "30px",
                        width: "120px",
                        height: "40px",
                        backgroundColor: "#610094",
                        color: "#fff",
                        fontSize: "15px"
                    }}
                    onClick={handleHeroAttempt}
                >
                    That is it!
                </button>
            </div>
            
            <div style={{width:"100%", display: "flex", marginTop: "20px"}}>
                <div style={{
                    borderRadius: "20px",
                    backgroundColor: "#150050",
                    width: "calc(50% - 20px)",
                    margin: "10px"
                }}>
                    <div style={{display: "flex",justifyContent: "center"}}>
                        <h3><strong>{dcCorrects+'/'+Object.keys(heroesObj.dcComics).length+' '}</strong>DC COMICS</h3>
                    </div>
                    {getHeroesCards(1)}
                </div>
                <div style={{
                    borderRadius: "20px",
                    backgroundColor: "#150050",
                    width: "calc(50% - 20px)",
                    margin: "10px"
                }}>
                    <div style={{display: "flex",justifyContent: "center"}}>
                        <h3><strong>{marvelCorrects+'/'+Object.keys(heroesObj.marvelComics).length+' '}</strong>MARVEL COMICS</h3>
                    </div>
                    {getHeroesCards(2)}
                </div>
            </div>
            

            <div style={{paddingTop: "40px"}}>
                <h2>
                    <Link href='allQuizes'>
                            <a>Back to all quiz</a>
                    </Link> 
                </h2>
            </div>
        </div>

    ) 
}