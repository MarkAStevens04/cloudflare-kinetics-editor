import demoVideo from './assets/BioBuilder_Demo.mp4'
import './radix.css';
import './styles/Banner.css';
import './styles/Mobile.css';


// import {
//      TooltipRoot, 
//      TooltipContent, 
//      TooltipTrigger 
// } from './Tooltips'
// import { Tooltip } from "radix-ui";

import { GitHubLogoIcon, DiscordLogoIcon, VideoIcon } from "@radix-ui/react-icons";
// import useThemeStore from './ThemeStore';



const shareDetails = {
    title: 'BioBuilder',
    text: 'Check out BioBuilder, a web-based biochemical kinetics editor and simulator!',
    url: 'https://biobuilder.app',
}





export default function MobileOverlay() {
  return (
    <>
    <div className="MobileOverlay">
    
        {/* <Banner /> */}
        <Notice />

        <div className="MobileSection">
            <div className="MobileTitle">BIOBUILDER</div>
            <div className="MobileSubtitle">
                <div style={{width: 'fit-content'}}>LIGHT</div>
                <div className="MobileSection" style={{margin: '0px 0px', display: 'flex', flexDirection: 'row', justifyContent: 'right', width: '100%', padding: '0px'}} >
                    <GitHubLogoIcon className="BannerLogo" onClick={() => window.open('https://github.com/MarkAStevens04/cloudflare-kinetics-editor', '_blank')} />
                    <DiscordLogoIcon className="BannerLogo" onClick={() => window.open('https://discord.gg/GmsKryYDGN', '_blank')} />
                    <VideoIcon className="BannerLogo" onClick={() => window.open('https://youtu.be/Lmgdc56ldk8', '_blank')} />
                </div>
                </div>
        </div>


        <div className="MobileSection">
            <div className="BulletSection"><b>No install, no setup.</b> <p>Open a tab and you’re modeling. No COPASI download, no Python environment.</p></div>
            <div className="BulletSection"><b>Draw the network, get the math for free.</b> <p>Drop in species and reactions on a visual canvas. BioBuilder builds the ODE system and simulates for you.</p></div>
            <div className="BulletSection"><b>Rapidly improve your networks.</b> <p>Hit simulate, and the curves move instantly alongside your network, so you can tweak and re-run in seconds.</p></div>
            <div className="BulletSection"><b>Free and open-source.</b> <p>No license, no paywall, no account wall. The code’s on GitHub if you want to contribute or check the math!</p></div>
        </div>


        <div className="MobileSection">
            <div className="MobileVideoContainer">
                <video autoPlay muted loop width="100%" height="auto" style={{position: 'absolute', top: '-6.5%', left: '0.2%'}}>
                <source src={demoVideo} type="video/mp4" /> 
                Your browser doesn't support video playback.
                </video>

                {/* <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/5qKTP-GZtws?si=aFZ7Hk8uCyM2TroS&amp;controls=0" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            style={{display: 'block'}}
          >
          </iframe> */}


                {/* <video autoPlay muted loop width="100%" height="auto" style={{position: 'absolute', top: '-6.5%', left: '0.2%'}}>
                <source src="https://biobuilder.app/BioBuilder%20Demo%20v2.mp4" type="video/mp4" /> 
                Your browser doesn't support video playback.
                </video> */}
            </div>
        </div>




        <div className="MobileSection" style={{margin: '0px 0px', display: 'flex', flexDirection: 'row', justifyContent: 'right', width: '100%'}} >
            <button className="MobileActionButton" style={{backgroundColor: '#4ECDC4'}} onClick={() => navigator.clipboard.writeText('https://biobuilder.app')} >Copy to Clipboard</button>
            <button className="MobileActionButton" style={{backgroundColor: '#3a86ff'}} onClick={handleShare} >Share Link</button>
        </div>
          
    </div>
    
    
    </>

  );
}

// Little banner at top that's giving a notice to the user
function Notice() {
    return (
        <>
        <div className="Notice background-gradient">
            <div className="NoticeText">BioBuilder is built for the desktop canvas.</div> 
            {/* <br />  */}
            <div className="NoticeText-2">Please continue on Desktop.</div>
        </div>
        </>
    );
}

// What happens when you click the share link button
const handleShare = async () => {
    if (navigator.share) {
        try {
            await navigator.share(shareDetails);
            console.log('Content shared successfully');
        } catch (error) {
            console.log('Error sharing content:', error);
        }
    } else {
        // Fallback for desktop or unsupported mobile browsers
        try {
            await navigator.clipboard.writeText(shareDetails.url);
            alert('Link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }
}