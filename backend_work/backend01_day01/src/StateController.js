import { useDispatch, useSelector } from 'react-redux';
import AgeCtrl from './components/AgeCtrl';
import CntCtrl from './components/CntCtrl';

function StateController(props) {
    const dispatch = useDispatch();

    return (
        <>
            <CntCtrl />
            <AgeCtrl />  
        </>
    )
}

export default StateController;