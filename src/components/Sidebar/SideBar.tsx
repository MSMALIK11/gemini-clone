import { useState } from 'react'
import { HistoryIcon, SettingsIcon, QuestionMarkIcon, MenuIcon, PlusIcon, MesageIcon } from '../../icons/Icons'
import { useContext } from 'react'
import { Context } from '../context/Context'
const SideBar = () => {
    const [expanded, setExpanded] = useState(false)
    const { previewPrompt, onSent, setRecentPrompt, newChat } = useContext(Context)
    const onToggleExpanded = () => {
        setExpanded(!expanded)
    }
    const onRecentClick = (prompt: string) => {
        setRecentPrompt(prompt)
        onSent(prompt)

    }
    return (
        <div id="sidebar" className=' bg-primary inline-flex justify-between flex-col '>
            <div className='top'>
                <div className='menu' tabIndex={0} onClick={onToggleExpanded}>
                    <MenuIcon />
                </div>
                <div className="newChat cursor-pointer" onClick={() => newChat()}>
                    <PlusIcon />
                    {expanded ? <p className='whitespace-nowrap text-sm text-white'>New</p> : null}
                </div>
                {
                    expanded ? <div className="recent mt-8">
                        <p className="recent-title my-2 text-white">Recent</p>
                        {
                            previewPrompt.length > 0 && previewPrompt.map((item: string) => {
                                return (
                                    <div className="recent-entry flex gap-2 items-center" onClick={() => onRecentClick(item)} >
                                        <MesageIcon />
                                        <p className='text-xs whitespace-nowrap text-white'>{item.slice(0, 18)}...</p>
                                    </div>
                                )
                            })
                        }

                    </div> : null
                }

            </div>

            <div className="bottom flex  flex-col gap-2">
                <div className="bottom-item">
                    <QuestionMarkIcon />
                    {expanded ? <p>Help</p> : null}
                </div>
                <div className="bottom-item">
                    <HistoryIcon />
                    {expanded ? <p >History</p> : null}
                </div>
                <div className="bottom-item">
                    <SettingsIcon />
                    {expanded ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    )
}

export default SideBar