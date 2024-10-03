import burgerIcon from '@/assets/burger-icon.svg';
import ia4SudLogo from '@/assets/logo-ia4sud.svg';
import { X } from 'lucide-react';
import './header.css';


import { useEffect, useState } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

export default function Header() {

    const [isOpen, setIsOpen] = useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    const isEventFinished = true;


    useEffect(() => {
        if(isOpen){
            document.body.classList.toggle('modal-open');
        }else{
            document.body.classList.remove('modal-open');
        }
    }, [isOpen])
    

    useEffect(() => {
        const handleScroll = () => {
            const nav = document.querySelector('nav');
            if (nav) {
                if (window.scrollY === 0) {
                    nav.style.background = 'transparent';
                    // remove shadow
                    nav.style.boxShadow = 'none';
                } else {
                    const scrollPercentage = Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1);
                    const gradientColors = [
                        [188, 104, 142],  // #BC688E
                        [109, 67, 142],  // #rgb(109 67 142)
                        [214, 100, 93]    // #d6645d
                    ];
                    
                    const interpolatedColor = gradientColors.reduce((acc, color, index) => {
                        if (index === gradientColors.length - 1) return acc;
                        const nextColor = gradientColors[index + 1];
                        const segmentPercentage = Math.min(Math.max((scrollPercentage - index / (gradientColors.length - 1)) * (gradientColors.length - 1), 0), 1);
                        const r = Math.round(color[0] + (nextColor[0] - color[0]) * segmentPercentage);
                        const g = Math.round(color[1] + (nextColor[1] - color[1]) * segmentPercentage);
                        const b = Math.round(color[2] + (nextColor[2] - color[2]) * segmentPercentage);
                        return `rgb(${r}, ${g}, ${b})`;
                    }, '');
                    
                    nav.style.background = interpolatedColor;
                    nav.style.boxShadow = '0 0 10px 0 rgba(0, 0, 0, 0.5)';
                }
                nav.style.transition = 'background 0.3s ease-out';
                // add shadow
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Nettoyage de l'écouteur d'événement lors du démontage du composant
        return () => {
            window.removeEventListener('scroll', handleScroll);
            
        };
    }, []);

    const menuItems = [
        {
            id: 1,
            label: 'Accueil',
            href: 'https://ia4sud.fr/'
        },
        {
            id: 2,
            label: 'Les vainqueurs du Hackathon',
            href: 'https://ia4sud.fr/#winners'
        },
        {
            id: isEventFinished ? 3 : 2,
            label: 'Les sujets abordés',
            href: 'https://ia4sud.fr/#subjects'
        },
        {
            id: isEventFinished ? 4 : 3,
            label: 'Réalisations',
            href: 'https://ia4sud.fr/#teams'
        },
        {
            id: isEventFinished ? 5 : 4,
            label: 'À propos',
            href: 'https://ia4sud.fr/#about'
        }

    ]

    const menuItemsWithoutWinners = menuItems.filter((item) => item.label !== 'Les vainqueurs du Hackathon')
    return (
        <nav className='container-header flex justify-between w-full'>
            <a href='https://ia4sud.fr/' className='cursor-pointer w-1/7 logo-header '>
            <img src={ia4SudLogo} alt="code4sud logo" className='w-full self-start ' />
            </a>
            <div>
                <button onClick={toggleDrawer} className='cursor-pointer bg-transparent w-fit h-full flex items-center justify-end  menu-burger'>
                    <img src={burgerIcon} alt="menu burger" className='w-[32px] ' />
                </button>
                <Drawer
                    open={isOpen}
                    onClose={toggleDrawer}
                    direction='right'
                    className='!w-full h-screen !bg-[#d6645d] border border-[#d6645d] content-sheet'
                >
                    <button className='absolute top-4 z-50  bg-[#d6645d] right-5' onClick={toggleDrawer}>
                        <X className='text-white' size={40} />
                    </button>
                    <div className='text-white flex justify-center items-center h-screen'>
                        <ul className='flex flex-col gap-10'>
                            {isEventFinished ? (
                                menuItems.map((item) => (
                                    <li key={item.id}><a href={item.href} className='text-4xl  font-[Handjet,sans-serif] flex items-start gap-2' onClick={toggleDrawer}><span className='font-[Manrope] text-xl'>{item.id} </span>{item.label}</a></li>
                                ))
                            ) : (
                                menuItemsWithoutWinners.map((item) => (
                                    <li key={item.id}><a href={item.href} className='text-4xl  font-[Handjet,sans-serif] flex items-start gap-2' onClick={toggleDrawer}><span className='font-[Manrope] text-xl'>{item.id} </span>{item.label}</a></li>
                                ))
                            )}
                        </ul>
                    </div>
                </Drawer>
            </div>
        </nav>
    )
}