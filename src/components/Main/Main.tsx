
import { useContext } from "react"
import { Context } from "../context/Context"
import { assets } from "../../assets/icons/assets"
import { SendIcon, MiceIcon, GallaryIcon, BulbIcon, CodeIcon } from '../../icons/Icons'
const Main = () => {
    const { input, onSent, setInput, showResult, recentPrompt, resultData, loading } = useContext(Context)
    return (
        <div className="min-h-screen w-full bg-primary">
            <nav className="flex items-center justify-between w-full px-4 h-[60px] ">
                <h1 className="text-white">Gemini</h1>
                <img src={assets.user_icon} alt="" className="rounded-full w-[50px]" />
            </nav>
            <div id="main-container">
                {
                    !showResult ? <div>
                        <div className="mt-10">
                            <h1 className=" greetName">Hello, Mohd, Shoaib</h1>
                            <p className="greetSubTitle text-softGray text-[50px]">How can i help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Evaluate and rank the following: film, digital, and polaroid cameras across price, photo quality, and trendiness. </p>
                                <div className="img">
                                    <BulbIcon />
                                </div>
                            </div>
                            <div className="card">
                                <p>Evaluate and rank the following: film, digital, and polaroid cameras across price, photo quality, and trendiness. </p>
                                <div className="img">
                                    <CodeIcon />

                                </div>
                            </div>
                            <div className="card">
                                <p>Evaluate and rank the following: film, digital, and polaroid cameras across price, photo quality, and trendiness. </p>
                                <div className="img">
                                    <CodeIcon />
                                </div>
                            </div>
                            <div className="card">
                                <p>Evaluate and rank the following: film, digital, and polaroid cameras across price, photo quality, and trendiness. </p>
                                <div className="img">
                                    <CodeIcon />
                                </div>
                            </div>
                        </div>
                    </div> : <div className="result h-[76vh] overflow-y-auto">
                        <div className="result-title flex gap-4 items-center">
                            <img className="rounded-full w-[36px]" src={assets.user_icon} alt="" />
                            <p className="text-white">{recentPrompt}</p>
                        </div>
                        <div className="result-data mt-4 flex items-start gap-4">
                            <img className="w-[36px] flex flex-start " src={assets.gemini_icon} alt="" />
                            {
                                !loading ? <p className="text-white" dangerouslySetInnerHTML={{ __html: resultData }}></p> :
                                    <div className="loader">
                                        <span></span>
                                        <span></span>
                                        <span></span>

                                    </div>
                            }

                        </div>
                    </div>
                }

                <div className="main-bottom">
                    <div className="input-search">
                        <input value={input} type="text" onChange={(e) => setInput(e?.target.value)} placeholder="Enter a prompt here" />
                        <div className="">
                            <GallaryIcon />
                            <MiceIcon />
                            <div onClick={() => onSent()}>
                                <SendIcon />
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </div >
    )
}

export default Main