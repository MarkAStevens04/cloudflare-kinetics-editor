import useStore from '../store';
import type { reactions } from '../store';
// Have to store these functions in a separate file for fast refresh!


// Function to initialize a Michaelis-Menten edge. Called when Michaelis-Menten edge is first created, or when the type changes to a Michaelis-Menten edge!
export function initializeMichaelisEdge(currRxn: reactions) {
    // const current = get().reactions.find(item => item.id === id) || {sources: [], targets: []};

    const addSimParam = useStore.getState().addSimParam; 
    const associateParam = useStore.getState().associateParam;

    const currParams = useStore.getState().simParams.filter(param => currRxn.associated_params.includes(param.id));
    console.log('curr params: ' + JSON.stringify(currParams, null, 2));

    // const existingSpecies = 
    const currParticipants = currRxn.participants.map(p => p.id);

    const currentEnzymeID = useStore.getState().species.filter(s => currParticipants.includes(s.id) && s.speciesType === 'enzyme').map(s => s.id)[0] || '';
    const currentSubstrID = useStore.getState().species.filter(s => currParticipants.includes(s.id) && s.speciesType === 'molecule').map(s => s.id)[0] || '';
    

    let kmID = '';
    let vmaxID = '';

    // Find the Km parameter in our parameter list. If there's not one, create it. 
    const existingKm = currParams.find(param => param.display.includes('Km'));
    kmID = existingKm ? existingKm.id : addSimParam('Km', '0.3');
    
    // Find the Vmax parameter in our parameter list. If there's not one, create it.
    const existingVmax = currParams.find(param => param.display.includes('Vmax'));
    vmaxID = existingVmax ? existingVmax.id : addSimParam('Vmax', '2.5');

    // Associate newly added parameters to our rxn
    if (!existingKm) { associateParam(kmID, currRxn.id); }
    if (!existingVmax) { associateParam(vmaxID, currRxn.id); }

    // console.log('sim params: ' + JSON.stringify(useStore.getState().simParams, null, 2));
    // console.log('associated params: ' + JSON.stringify(useStore.getState().reactions, null, 2))

    const kmLatex = '\\obj' + kmID + '{\\text{' + kmID + '}}';
    const vmaxLatex = '\\obj' + vmaxID + '{\\text{' + vmaxID + '}}';
    const substrLatex = '\\obj' + currentSubstrID + '{\\text{' + currentSubstrID + '}}';


    const newRateLaw = '\\frac{' + vmaxLatex + '\\cdot' + substrLatex + '}{' + kmLatex + '+' + substrLatex + '}';
    
    const newParticipants = currRxn.participants.map(p => {
        if (p.id !== currentEnzymeID) { return p; }

        return { ...p, id: currentEnzymeID, role: 'catalyst' };
    });

    // Remove duplicate IDs from associated_params!
    const newParameters = [...currRxn.associated_params, kmID, vmaxID];


    console.log('new participants: ' + JSON.stringify(newParticipants, null, 2));

    return { ...currRxn, rate_type: 'michaelis_menten', participants: newParticipants, rate_law: newRateLaw, associated_params: [...new Set(newParameters)] };

};