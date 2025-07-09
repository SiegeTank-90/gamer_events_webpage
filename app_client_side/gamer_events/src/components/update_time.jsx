
import ReactDom from 'react-dom';
import '../styles/models.css'

export default function NewTimeDialog({ open, onClose }) {
    console.log(open.currObject)
    if (open.isOpen == false) {
        return null; // If the dialog is not open, return null to render nothing
    }

    async function HandleUpdateTime(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        let matchDate = formData.get("matchDate");
        let convertedDate = new Date(matchDate);
        const PutResponse = await fetch(`http://localhost:5050/matches`, {
            method: 'Put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: open.currObject.uid,
                matchDate: convertedDate.toISOString()
            })
        })


        onClose();
    }


    return ReactDom.createPortal(
        <>
            <div className='newMatchModelOverlay'> </div>
            <div className="newMatchModel">
                <form method="put" onSubmit={HandleUpdateTime} className='newMatchModelForm'>
                    <input type='date' id="matchDate" name="matchDate"></input>

                    <button type="submit" className='newMatchModelButton'>Update Date</button>
                </form>
            </div>
        </>,
        document.getElementById('portal-root')
    )

}