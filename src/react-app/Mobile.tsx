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

// import { GitHubLogoIcon, DiscordLogoIcon, VideoIcon } from "@radix-ui/react-icons";
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
            <div className="MobileSubtitle">LIGHT</div>
        </div>


        <div className="MobileSection">
            <div className="BulletSection"><b>No install, no setup.</b> <p>Open a tab and you’re modeling. No COPASI download, no Python environment.</p></div>
            <div className="BulletSection"><b>Draw the network, get the math for free.</b> <p>Drop in species and reactions on a visual canvas. BioBuilder builds the ODE system and simulates for you.</p></div>
            <div className="BulletSection"><b>Rapidly improve your networks.</b> <p>Hit simulate, and the curves move instantly alongside your network, so you can tweak and re-run in seconds.</p></div>
            <div className="BulletSection"><b>Free and open-source.</b> <p>No license, no paywall, no account wall. The code’s on GitHub if you want to contribute or check the math!</p></div>
        </div>

        {/* <div className="MobileSectionHeader">
            Here's what you're missing:
        </div> */}
        <div className="MobileSection">
            <div className="MobileVideoContainer">
                <video autoPlay muted loop width="100%" height="auto" style={{position: 'absolute', top: '-6.5%', left: '0.2%'}}>
                <source src={demoVideo} type="video/mp4" /> 
                Your browser doesn't support video playback.
                </video>
                <div> test text </div>
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



// function Banner() {

//   // REMINDER: Cute color palette: #f00, #0ff, #0077b6. Not required to use, but helpful if wanting to come back later lol.
//   const tutorialPhase = useThemeStore((state) => state.tutorialPhase);
//   const setTutorialPhase = useThemeStore((state) => state.setTutorialPhase);

//   return (
//   <div className="Banner">

//     {/* Title */}
//     <div className="BannerSection" >
//           <div className="BannerTitle">BIOBUILDER</div> 
//           <div className="BannerSubtitle">LIGHT</div>
//     </div>

//     {/* Calls to action */}
//     <div className="BannerSection" style={{justifyContent: 'center', alignItems: 'center'}}>
//       <GitHubLogoIcon className="BannerLogo" onClick={() => window.open('https://github.com/MarkAStevens04/cloudflare-kinetics-editor', '_blank')} />
                
//       <DiscordLogoIcon className="BannerLogo" onClick={() => window.open('https://discord.gg/GmsKryYDGN', '_blank')} />

//       <TooltipRoot open={tutorialPhase === 1} onOpenChange={() => setTutorialPhase(2)}>
//       {/* <TooltipRoot defaultOpen={tutorialPhase === 1} > */}
//         <TooltipTrigger>
//         <VideoIcon className="BannerLogo" onClick={() => window.open('https://youtu.be/Lmgdc56ldk8', '_blank')} />
//       </TooltipTrigger>

//       <TooltipContent side="bottom" sideOffset={10}>
//         Re-watch the walkthrough video here!
//         <Tooltip.Arrow className="TooltipArrow" />
//       </TooltipContent>
//       </TooltipRoot>

//     </div>


//     {/* Last section */}
//     <div className="BannerSection" />
  
//   </div>
//   );
// }

// Little banner at top that's giving a notice to the user
function Notice() {
    return (
        <>
        <div className="Notice">
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