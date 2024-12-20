import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReactHowler from "react-howler";

function Hero(props) {
    const [sound, setSound] = useState(null);
    const [isHowling, setIsHowling] = useState(false);

    useEffect(() => {
        setSound(props.data?.cries.latest);
    }, []);

    return (
        <>
            <div className="flex justify-between items-center bg-gray-300 px-12">
                <div className="p-6">
                    <h2 className="text-3xl font-bold capitalize mb-2">{props.data?.name}</h2>

                    {/* types */}
                    <div className="flex gap-2">{props.data?.types.map((type, index) => {
                        return (<span key={index} className="border border-black rounded-3xl px-4">{type.type.name}</span>)
                    })}</div>
                    {/* end types */}

                    <div className="flex justify-between mt-2">
                        <span>Weight: {props.data?.weight}</span>
                        <span>Height: {props.data?.height}</span>
                    </div>
                </div>

                <figure className="h-96 bg-gray-300 flex items-center">
                    <img onMouseEnter={() => setIsHowling(true)} onMouseLeave={() => setIsHowling(false)} className="h-60 hover:animate-pulse" src={props.data?.sprites.other["official-artwork"].front_default} />
                    <ReactHowler src={sound ? sound : "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/1.ogg"} playing={isHowling} />
                </figure>

                {/* base stats */}
                <div>
                    <h2 className="text-xl font-bold">Base Stats</h2>
                    <table className="bg-gray-200">
                        <tbody>
                            {
                                props.data?.stats.map((stat, index) => {
                                    return (
                                        <tr className="border-b border-black/30" key={index}>
                                            <td className="py-1 px-4">{stat.stat.name}</td>
                                            <td className="py-1 px-4">: {stat.base_stat}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                </div>
                {/* end base stats */}

            </div>
        </>
    );
}

function Detail(props) {
    const { id } = useParams(null);
    const [pokeData, setPokeData] = useState(null);

    const fetchData = async () => {
        try {
            const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon/' + id);
            setPokeData(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <Hero data={pokeData} />
        </>
    );
}

export default Detail;